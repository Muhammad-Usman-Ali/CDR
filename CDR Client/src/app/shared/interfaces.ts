
  export interface CallRecords {

    record_id: string;
    hangup_cause: string;
    destination_number: string;
    start_stamp: string;
    end_stamp: string;
    billsec: string;
    termination: string;
    caller_id_name: string;
    org_ip: string;
    country_name: string;
    country_code: string;
  }

  export interface ApiParameters {
    startDate: string;
    endDate: string;
    skip: number;
    limit: number;
  }

export interface QueryParameters {
  startDate: string;
  endDate: string;

  shortBPartyTotalCount: number;
  shortBPartyMaxDuration: number;

  shortAPartyTotalCount: number;
  shortAPartyMaxDuration: number;

  consecutiveNumbersMinDestCount: number;

  matchingDurationTotalCount: number;

  sdTotalCount: number;
  sdMaxForSD: number;
}

export interface User {
  id: string;
  name: string;
  userName: string;
  password: string;
  isAdmin?: boolean;
  exp?: number;
  iat?: number;
}

export interface Callrecord {
  end_stamp: string;
  billsec: string;
  minutes: string;
  org_ip: string;
  dest_group_name: string;
}

export enum BlockLogsEnum {
  Blocked = '1',
  Processed = '2',
  UpdatedBlocked = '3'
}

export interface DataForDays {
  today: {
    billsec: number;
    dest_group_name?: string;
    org_ip?: string;
    minutes?: number;
    block_logs?: BlockLogsEnum;
  }[];
  yesterday: {
    billsec: number;
    dest_group_name?: string;
    org_ip?: string;
    minutes?: number;
    block_logs?: BlockLogsEnum;
  }[];
}
export interface TCallsVACalls {
  answeredCalls: {
    date: string;
    calls: number;
  }[];
  totalCalls: {
    date: string;
    calls: number;
  }[];
}

export interface TrafficSource {
  week: {
    calls: {
      totalCalls: number;
    },
    trafficSource: {
      calls: number;
      dest_group_name: string;
    }[]
  };
  month: {
    calls: {
      totalCalls: number;
    },
    trafficSource: {
      calls: number;
      dest_group_name: string;
    }[]
  };
}

export interface BlockedCalls {
  billsec: string;
  end_stamp: string;
}
export interface Graph {
  dataForDays: DataForDays;
  tCallsVACalls: TCallsVACalls;
  trafficSource?: TrafficSource;
  blockedCalls?: BlockedCalls[];
}
