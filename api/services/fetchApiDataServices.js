var { Op } = require('sequelize');
var request = require('request');
var crypto = require('crypto');
var querystring = require('querystring');
var papaParse = require('papaparse');
var _ = require('lodash');
const { LogModel } = require('../models/sequelize');
const { PrefixModel } = require('../models/sequelize');
const { RateModel } = require('../models/sequelize');
const genericHelpers = require('../helpers/genericHelpers');

var countryArrayFile = require('../helpers/countryArray');

const PAGER = 50000;

// returns seller data from api in form of json array
module.exports.getSellerDataFromApi = async (i_tariff, _connectionErrorCount) => {
  let apiData, convertedApiData;
  let connectionErrorCount = _connectionErrorCount ? _connectionErrorCount : 0;
  
  try {
    apiData = await getDataFromApi('accounts', { i_tariff: i_tariff});
  } catch (error) {

    // we will iterate the process on error 5 times
    if (connectionErrorCount < 5) {
      apiData = await exports.getSellerDataFromApi(i_tariff, ++connectionErrorCount);
      return apiData;
    } else if (connectionErrorCount >= 5) {
      await genericHelpers.logger(501,'Error in getting the API data of seller with i_tariff: ' + i_tariff, error);
      return [];
    }
  }

  convertedApiData = papaParse.parse(apiData, {header: true});

  // removes the last index, which always have an error (because it will only have "" in the last row)
  if (convertedApiData && convertedApiData.data && convertedApiData.data.length > 0) { convertedApiData.data.pop(); }
  return  convertedApiData.data;
};

module.exports.getCountryDataFromApi = async (_countryName, _offset, _retriedConnection) => {
  let apiData;
  let retriedConnection = _retriedConnection ? _retriedConnection : 0;

  try {
    apiData = await getDataFromApi('lookup', {country: _countryName, offset: _offset });
  } catch (error) {

    // if sockect hangsup, resend the request maximum 5 times
    if (error && retriedConnection < 5) {
      console.log();
      apiData = await exports.getCountryDataFromApi(_countryName, _offset, ++retriedConnection);
      return apiData;
    } else {
      apiData = {};
    }
    
  }

  // console.clear();
  // console.log(apiData);

  if (apiData) { apiData = JSON.parse(apiData); }
  return apiData;
};

async function getDataFromApi (_controller, _params) {
  let params;
  const username = 'VectorTelecom';
  const apiKey = 'Lt5YD7tfjD493PIo7aj2HDLxI5oyq6E2qzQUx90GDUGwAeLxfUqMn29WXolelP6BfNlCNc9gWFDmJeKPZ1rcTrZHFaLQQIiVluoYwn4jSywsC67rYpuHGjeckQT0o1Lz';
  const ts = Math.round(((new Date).getTime() / 1000));
  const signature = crypto.createHash('sha256').update(_controller + apiKey + username + ts).digest('hex');
  const link = `https://members.telecomsxchange.com/${_controller}.php`;

  params = {
    'ts': ts,
    'signature': signature,
    'api_login': username,
    'webapi': 1,
    'searchform': '1',
    // 'type': 'NoCLI',
  };

  // for getting country data
  if (_controller.toUpperCase() == 'LOOKUP') {
    params.country = _params.country;
    params.pager = PAGER;
    params.off = _params.offset;
    // params.type = 'NoCLI';

  } else if (_controller.toUpperCase() == 'ACCOUNTS') { // for getting data of a single seller
    params.download = _params.i_tariff;
    // params.pager = 5;
    // params.off = _params.offset;
  }

    // const dataString = `{ "ts": ${ts}, "signature": ${signature}, "api_login": ${username}, "webapi": 1, "download": 998 }`;
  params = querystring.stringify(params);
  
  return new Promise((_resolve, _reject) =>{
    request.post({
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: link,
      forever: true,
      body: params
    }, (error, response, body) => {

      // we send reject when error comes
      if (params.country == 'Belgium') {
        console.log();
        
      }
      if (error) { _reject(error); return;}
      _resolve(body);
    });
  });
}

// get data from all countries and save the sellers from them
module.exports.getDataFromApiAndSaveIt = async () => {
  let isFirstTimeCountryChecked, dateToday, lastCountrySaved;
  // json array of countries
  const arrayOfAllCountries = countryArrayFile.getCountriesListInArray();

  isFirstTimeCountryChecked = true;


  dateToday = new Date();
  dateToday.setHours(0, 0, 0); // getting todays date with time 00:00:00
 
  // getting last country whose data is saved in the database
  lastCountrySaved = await LogModel.findOne({
    where: {
      createdAt: {
        [Op.gte]: dateToday
      },
      statusCode: 200
    },
    order: [
      ['createdAt', 'DESC']
    ],
    raw: true
  });

  // looping over all countries
  for (let i = 0; i < arrayOfAllCountries.length; i++) {
    const countryName = arrayOfAllCountries[i];
    let indexOfCountryInMessageString;

    // checking whether current country in loop is last country saved
    if (lastCountrySaved && lastCountrySaved.message) {
      indexOfCountryInMessageString = lastCountrySaved.message.indexOf(countryName);
    }
    try {

      // if the last country's data saved in the database is the current country in the loop, this will run
      // Or if the we have got the last saved country in any previous iteration
      if ((indexOfCountryInMessageString && indexOfCountryInMessageString != -1 && isFirstTimeCountryChecked == true) || isFirstTimeCountryChecked == false || (!lastCountrySaved)) {
        isFirstTimeCountryChecked = false;
        await getRatesAndSaveThem(countryName, 0);
      }
    } catch (error) {
      await genericHelpers.logger(501, 'Error during fetch from API and saving country rates. Now, moving to next country. Error on country: ' + countryName, error);
    }
  }

};

async function getRatesAndSaveThem(_countryName, _offset) {
  let countryDataFromApi;
  let countryName = _countryName;
  let offset = _offset;

  console.log('Country is : ', countryName, ', Offset is: ', offset);
  countryDataFromApi = await exports.getCountryDataFromApi(countryName, offset);

  
  await genericHelpers.logger(200, 'Country Data Received', `Country: ${countryName}, Records Count: ${countryDataFromApi.rates ? countryDataFromApi.rates.length : 'rates undefined or null'}`);
  // if status from the API is success
  if (countryDataFromApi && countryDataFromApi.status == 'success' && countryDataFromApi.rates && countryDataFromApi.rates.length > 0) {

    await saveRatesInChunksAndAddPreviousMinutes(countryDataFromApi);
   
  }

  // if received data is more than PAGER, we will again get the data
  if (countryDataFromApi && countryDataFromApi.status == 'success' && countryDataFromApi.rates && countryDataFromApi.rates.length == PAGER) {
    offset = offset + PAGER; // 2 less, so we receive atleast 2 records if total are modulas to PAGER
    await getRatesAndSaveThem(countryName, offset);
  }
}


// saves the rates 
async function saveRatesInChunksAndAddPreviousMinutes(_dataFromApi, _offset) {
  let ratesLimit = 20000;
  let arrayOfFetchedRecordsWithYesterdayMinutes = [];

  const offset = _offset ? _offset : 0;
  let arrayToBeSaved = _dataFromApi.rates.slice(offset, offset + ratesLimit);
  const lengthOfArrayToBeSaved = arrayToBeSaved.length;
  const dateNow = (new Date()).toUTCString();

  let dateYesterDay = new Date();
  dateYesterDay.setDate(dateYesterDay.getDate() - 1);
  dateYesterDay = dateYesterDay.toUTCString();
  // 0 minutes will be added default by the database

  for (let i = 0; i < arrayToBeSaved.length; i++) {
    const _e = arrayToBeSaved[i];

    _e.price = _e['price_1'];
    _e.date = dateNow;
    _e.sellerName = _e['vendor_name'];
    _e.operatorName = _e['description'];
    _e.country = _e['country_name'];
    _e.routeType = _e['route_type'];

    if (_e['daily_minutes'] > 0) {
      arrayOfFetchedRecordsWithYesterdayMinutes.push({ prefix: _e.prefix, minutes: _e['daily_minutes'], date: dateYesterDay, sellerName: _e.sellerName, operatorName: _e.operatorName, routeType: _e.routeType });
    }
  }

  await RateModel.bulkCreate(arrayToBeSaved);

  await saveNewPrefixes(arrayToBeSaved);
  arrayToBeSaved = []; // deleting data from the array to gain RAM

  
  // if we have some records with last day minutes
  if (arrayOfFetchedRecordsWithYesterdayMinutes.length > 0) {
    await addMinutesInYesterdayRates(arrayOfFetchedRecordsWithYesterdayMinutes, dateYesterDay);
    arrayOfFetchedRecordsWithYesterdayMinutes = []; // to increse data in the array and increse RAM
  }


  // if rates fetched from the server are equals to the rate limit and we have to get the rates again
  if (lengthOfArrayToBeSaved == ratesLimit) {
    await saveRatesInChunksAndAddPreviousMinutes(_dataFromApi, offset + ratesLimit);
  }
  
}

// add minutes in the yesterday rates
async function addMinutesInYesterdayRates(_arrayOfFetchedeRecordsWithMinutes, _dateYesterday) {
  // let arrayOfRatesSpecificToCurrentSeller;
  let arrayOfLastDayRatesFromDatabase = [];

  const objectOfYesterdayRecordsGroupedBySellers = _.groupBy(_arrayOfFetchedeRecordsWithMinutes, 'sellerName');
  const arrayOfSellers = Object.keys(objectOfYesterdayRecordsGroupedBySellers);

  // looping all over the sellers in yesterday data array
  for (let j = 0; j < arrayOfSellers.length; j++) {
    let arrayOfRatesSpecificToCurrentSeller = objectOfYesterdayRecordsGroupedBySellers[arrayOfSellers[j]];

    arrayOfRatesSpecificToCurrentSeller = await RateModel.findAll({
      where: {
        date: _dateYesterday,
        sellerName: arrayOfSellers[j],
        prefix: {
          [Op.in] : arrayOfRatesSpecificToCurrentSeller.map(_e => _e.prefix)
        }
      }
    });
    
    arrayOfLastDayRatesFromDatabase.push(...arrayOfRatesSpecificToCurrentSeller);
  }
  // arrayOfRatesSpecificToCurrentSeller = []; // to remove data for increse in RAM
 
  if (arrayOfLastDayRatesFromDatabase.length > 0) {
    let yesterDayRate;
  // saving price from database rates into newly created array with minutes
    _arrayOfFetchedeRecordsWithMinutes.forEach(_rate => {
      yesterDayRate = arrayOfLastDayRatesFromDatabase.find(_e => _e.prefix == _rate.prefix && _e.sellerName == _rate.sellerName && _e.routeType == _rate.routeType);

      _rate.price = yesterDayRate ? (yesterDayRate.price ? yesterDayRate.price : '0') : '0';

    });

    // deleting last day records now have minutes
    await RateModel.destroy({
      where: {
        id: {
          [Op.in]: arrayOfLastDayRatesFromDatabase.map(_e => _e.id)
        }
      }
    });

    await RateModel.bulkCreate(_arrayOfFetchedeRecordsWithMinutes);
  }
}

async function saveNewPrefixes(_arrayOfRates) {
  let arrayOfRates, arrayOfPrefixesFromDatabase;

  // deleting same prefixes more than one
  arrayOfRates = _.uniqBy(_arrayOfRates, 'prefix');

  // getting the prefixes from the database
  arrayOfPrefixesFromDatabase = await PrefixModel.findAll({
    attributes: ['prefix'],
    where: { 
      prefix: {
        [Op.in]: arrayOfRates.map(_e => _e.prefix)
      }
    }
  });

  // filtering the rates which are available in the database
  arrayOfRates = arrayOfRates.filter(_e => !arrayOfPrefixesFromDatabase.find(_rate => _rate.prefix == _e.prefix));

  // adding the rates not available in the database right now
  if (arrayOfRates.length > 0) {
    await PrefixModel.bulkCreate(arrayOfRates);
  }
  

}