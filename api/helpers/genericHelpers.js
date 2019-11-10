var fetchApiDataServices = require('../services/fetchApiDataServices');
// var { RateModel } = require('../models/sequelize');
var Op = require('sequelize').Op;
var { sequelize } = require('../models/sequelize');
var { LogModel} = require('../models/sequelize');

module.exports.jsonResult = function(res, status, data) {
  res.status(status).json(data);
};

module.exports.logger = async function(statusCode, status, message){
  var log = LogModel.build();

    // Checking whether message is object or simple string
  if (message) message = typeof message === 'string' ? message : JSON.stringify(message);
  else message = '';

  log = {
    statusCode: statusCode,
    status: status,
    message: typeof message === 'string' ? message : message.toString()
  };

  await LogModel.create(log);
};

module.exports.apiListener = async function() {


  
    // startSession(); // Outside of the setIn
  
    // Runs only when production
  // if (process.env.NODE_ENV === 'production') {
        
  //       // will call it after 10 seconds of the starting the application
  //   setTimeout(() => {
  //     startSession();
  //   }, 10000);

  //   setInterval(() => {
  //     startSession();
  //       // }, 10000);
  //   }, 1000 * 60 * 60);
  //       // }, 1000);
  // } else {
  //   setTimeout(() => {
  //     startSession();
  //   }, 1000);

  // }

  
  let previousDayOfDataFetching;
  
  if (process.env.NODE_ENV != 'production') {

    setTimeout(() => {
      previousDayOfDataFetching = (new Date()).getUTCDate();
      // startSession();
    }, 1000);
  }

  // runs on server
  // if (process.env.PORT || process.env.port) {
  if (process.env.NODE_ENV == 'production') {
    setInterval(() => {
      let dayNow = (new Date()).getUTCDate();

      if (dayNow != previousDayOfDataFetching) {
        let hourNow = (new Date()).getUTCHours();

        if (hourNow > 0) {
          startSession();
          previousDayOfDataFetching = dayNow;
        }
      }
    }, 1000 * 60);
  }
};


async function startSession() {
  // await helps to first run the country fetching then sellers fetching
  try {
    // const todayDate = (new Date()).setHours(0, 0, 0);
    // await LogModel.destroy({
    //   where: {
    //     createdAt: {
    //       [Op.gte]: todayDate
    //     }
    //   }
    // });

    
    await fetchApiDataServices.getDataFromApiAndSaveIt();
    await deleteLogsOlderThanTwoMondths();
    await deleteDuplicateRowsInRates();

    
    await exports.logger(201, 'Daily rates sync completed!');
    // await fetchApiDataServices.getSellersFromDatabaseAndSaveRates(); 
  } catch (error) {
    await exports.logger(501, 'Error during fetch from API.', error);
  }
}

async function deleteLogsOlderThanTwoMondths() {

  let date = new Date();
  date.setMonth(date.getMonth() - 2);

  try {
    await LogModel.destroy({
      where: {
        createdAt: { [Op.lte]: date},
      }
    });
  } catch (error) {
    await exports.logger(501, 'Error during deleting logs automatically.', error);
  }
}

async function deleteDuplicateRowsInRates() {
  await sequelize.query(`DELETE  FROM
  rates a
      USING rates b
WHERE
  a.id > b.id
  AND a.prefix = b.prefix
AND a.date = b.date
AND a.price = b.price
AND a."routeType" = b."routeType"
AND a."sellerName" = b."sellerName"`).then(async([results, metadata]) => {
    // console.log(results, metadata);
  
    if (metadata) {
      await exports.logger(201, 'Duplicate Records Deleted!', 'Duplicate records successfully deleted. Rows count: ' + metadata.rowCount);
    }
  // Results will be an empty array and metadata will contain the number of affected rows.
  });
}




module.exports.checkingUrl = async (_req, _res) => {
  let iTariff = _req.params.iTariff ? _req.params.iTariff : '0';
  let body, attributesArray;
  try {
  
    body = await fetchApiDataServices.getSellerDataFromApi(iTariff);

    
    if (body && body.length > 0) {
      
      let html = `<p>Total Records: ${body.length}</p>`;
      html = html + '<table style="border-collapse: collapse; text-align:center;" border="1"> <thead> <tr>';
      let headerArray = Object.keys(body[0]);

      headerArray.forEach(_h => {
        html = html + `<th>${_h}</th>`;
      });
      html = html + '</tr> </thead> <tbody>';

      body.forEach((_innerArray) => {

        html = html + '<tr>';

        attributesArray = Object.keys(_innerArray);
        attributesArray.forEach(_value => {
          html = html + `<td>${_innerArray[_value]}</td>`;
        });

        html = html + '</tr>';
      });

      html = html + '</tbody> </table>';
      _res.send(html);
      return;
    }

    _res.send('out of the if block or no data found');
  } catch (error) {
    console.log();  
  }
  // this.jsonResult(_res, 200, body);
    // console.log(body);

  // options = {
  //   url: link,
  //   // forever: true,
  //   body: params,
  //   json: true, // Automatically parses the JSON string in the response
  // };


  // var data = {
  //   var1:"something",
  //   var2:"something else"
  // };
  // var options = {
  //   hostname: 'https://members.telecomsxchange.com',
  //   port: 80,
  //   path: 'accounts.php',
  //   method: 'POST',
  // };
 



  // axios.post(link,params, {

  //   // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  //   transformRequest: [function (data) {
  //     const _data = querystring.stringify(data);
  //     return _data; 
  //   }]
  // })
  //   .then((_data) => {
  //     try {
  //       this.jsonResult(_res, 200, _data);
  //     } catch (_error) {
  //       this.jsonResult(_res, 200, _error);
  //       return;
  //     }
      
  //   });
 




  // let options;
  // const username = 'VectorTelecom';
  // const apiKey = 'Lt5YD7tfjD493PIo7aj2HDLxI5oyq6E2qzQUx90GDUGwAeLxfUqMn29WXolelP6BfNlCNc9gWFDmJeKPZ1rcTrZHFaLQQIiVluoYwn4jSywsC67rYpuHGjeckQT0o1Lz';
  // const controller = 'accounts';
  // const ts = (new Date).getTime();


  // const signature = crypto.createHash('sha256').update(controller + apiKey + username + ts).digest('hex');

  // const link = 'https://members.telecomsxchange.com/accounts.php';
  // const params = {
  //   'ts': ts,
  //   'signature': signature,
  //   'api_login': username,
  //   'webapi': 1,
  //   'download': 584
  // };
  // options = {
  //   url: link,
  //   // forever: true,
  //   body: params,
  //   json: true, // Automatically parses the JSON string in the response
  // };
    
  // // Setting time to delay the call to the API
  // // setTimeout(() => {
  // try {
  //   rp.post(options, (error, response, body) => {
  //     this.jsonResult(res, 200, body);
  //   });
  // } catch (_error) {
  //   this.jsonResult(res, 501, _error);
  //   return;
  // }
};

module.exports.checkRatesAll = async (_req, _res) => {

  let body = await fetchApiDataServices.getCountryDataFromApi(_req.params.countryName);

  if (body && body.status == 'success' && body.rates && body.rates.length > 0) {

    let html = `<p>Total Records: ${body.rates.length}</p>`;
    html = html + '<table style="border-collapse: collapse; text-align:center;" border="1"> <thead> <tr>';
    let headerArray = Object.keys(body.rates[0]);

    // attaching headers
    headerArray.forEach(_h => {
      html = html + `<th>${_h}</th>`;
    });
    html = html + '</tr> </thead> <tbody>';

    // attaching data
    body.rates.forEach((_innerObject, i) => {
      let innerObjectKeys = Object.keys(_innerObject);
      html = html + '<tr>';

      // getting data by adding the attributes trought the loop over the attributes
      innerObjectKeys.forEach(_innerObjectAttribute => {
        html = html + `<td>${_innerObject[_innerObjectAttribute]}</td>`;
      });
      html = html + '</tr>';
    });

    html = html + '</tbody> </table>';
    _res.send(html);
    
    return;
  }

  
  _res.send('out of the if block or no data found');
};

/**
 * this function ensures that, JSON.stringify on error message returns all attributes
 * when getting in the logger 
 */
module.exports.attachToJsonPropertyWithErrorPrototype = () => {
  if (!('toJSON' in Error.prototype))
    Object.defineProperty(Error.prototype, 'toJSON', {
      value: function () {
        var alt = {};

        Object.getOwnPropertyNames(this).forEach((key) => {
          alt[key] = this[key];
        });

        return alt;
      },
      configurable: true,
      writable: true
    });
};


