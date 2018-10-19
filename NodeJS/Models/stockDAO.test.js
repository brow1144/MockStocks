import axios from 'axios';
import {tickerModel} from "../utilities/MongooseModels";
import {
  getStock,
  getStockIntraday,
  formatStocks,
  getTickers,
  getTicker,
  updateTickerBuy,
  updateTickerSell,
  formatDaily
} from './stockDAO';

axios.get = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

tickerModel.findOneAndUpdate = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

tickerModel.findOne = jest.fn(() => {
  return Promise.resolve(
    {
      tickers:
        [{
          symbol: 'AAPL',
          buyCount: 5,
          currentCount: 14,
          dailyBuyCount: 3,
          weeklyBuyCount: 1,
          sellCount: 22
        }]
    });
});

const monthCall = 'https://api.iextrading.com/1.0/stock/MSFT/chart/Monthly';
const dailyCall = 'https://api.iextrading.com/1.0/stock/MSFT/chart/1d';
const dateNow = '2018-08-25T22:00:23.109Z';

const bogusData = [
  {
    "date": "2018-09-18",
    "open": 112.19,
    "high": 113.695,
    "low": 111.72,
    "close": 113.21,
    "volume": 22170934,
    "unadjustedVolume": 22170934,
    "change": 1.07,
    "changePercent": 0.954,
    "vwap": 113.2551,
    "label": "Sep 18",
    "changeOverTime": 0
  },
  {
    "date": "2018-09-19",
    "open": 113.05,
    "high": 113.32,
    "low": 111.035,
    "close": 111.7,
    "volume": 21728429,
    "unadjustedVolume": 21728429,
    "change": -1.51,
    "changePercent": -1.334,
    "vwap": 111.7689,
    "label": "Sep 19",
    "changeOverTime": -0.013338044342372502
  },
  {
    "date": "2018-09-20",
    "open": 112.28,
    "high": 113.8,
    "low": 111.93,
    "close": 113.57,
    "volume": 23714512,
    "unadjustedVolume": 23714512,
    "change": 1.87,
    "changePercent": 1.674,
    "vwap": 113.3834,
    "label": "Sep 20",
    "changeOverTime": 0.003179931101492796
  }
];

const bogusDataDay = [
  {
    "date": "20181018",
    "minute": "09:30",
    "label": "09:30 AM",
    "high": 110.27,
    "low": 110.12,
    "average": 110.195,
    "volume": 200,
    "notional": 22039,
    "numberOfTrades": 2,
    "marketHigh": 110.32,
    "marketLow": 110.03,
    "marketAverage": 110.143,
    "marketVolume": 734450,
    "marketNotional": 80894604.6284,
    "marketNumberOfTrades": 1352,
    "open": 110.27,
    "close": 110.12,
    "marketOpen": 110.13,
    "marketClose": 110.17,
    "changeOverTime": 0,
    "marketChangeOverTime": 0
  },
  {
    "date": "20181018",
    "minute": "09:31",
    "label": "09:31 AM",
    "high": 110.19,
    "low": 109.98,
    "average": 110.097,
    "volume": 4232,
    "notional": 465929.71,
    "numberOfTrades": 43,
    "marketHigh": 110.21,
    "marketLow": 109.97,
    "marketAverage": 110.115,
    "marketVolume": 217806,
    "marketNotional": 23983678.1859,
    "marketNumberOfTrades": 1986,
    "open": 110.19,
    "close": 110.12,
    "marketOpen": 110.17,
    "marketClose": 110.127,
    "changeOverTime": -0.0008893325468487588,
    "marketChangeOverTime": -0.00025421497507790595
  }
];

const formattedData = [
  {
    "x": 1537401600000,
    "y": 113.57
  },
  {
    "x": 1537315200000,
    "y": 111.7
  },
  {
    "x": 1537228800000,
    "y": 113.21
  }
];

const formattedDataDateRestricted = [{"x": 1539869471408, "y": 110.12}, {"x": 1539869411408, "y": 110.12}];

describe('Positive Stock Calls', function () {
  let dateLimit;
  beforeAll(() => {
    dateLimit = new Date(dateNow);
  });

  it('should call the API with the proper URL - Daily', async function () {
    await getStockIntraday('MSFT');
    expect(axios.get).toHaveBeenCalledWith(dailyCall);
  });

  it('should call the API with the proper URL - MONTH/TriMonth', async function () {
    await getStock('MSFT', 'Monthly', dateLimit);
    expect(axios.get).toHaveBeenCalledWith(monthCall);
  });

  it('should format the data returned by the API call into x/y coordinates sorted and limited', function () {
    const alteredData = formatStocks(bogusData, dateLimit);
    expect(alteredData).toEqual(formattedData);
  });

  it('should only have data that is more recent than daily', function () {
    const alteredData = formatDaily(bogusDataDay);
    expect(alteredData).toBeTruthy();
  });

  it('should call findOne for all tickers', async function () {
    await getTickers();
    expect(tickerModel.findOne).toHaveBeenCalledWith({}, {tickers: 1, _id: 0});
  });

  it('should call findOne for one ticker', async function () {
    await getTicker('AAPL');
    expect(tickerModel.findOne).toHaveBeenCalledWith({'tickers.symbol': 'AAPL'}, {'tickers.$': 1, '_id': 0});
  });
});

describe('stockDAO for getTicker', function () {
  it('should call findOneAndUpdate with the correct information', async function () {
    let ticker = {
      buyCount: 5,
      currentCount: 14,
      dailyBuyCount: 3,
      weeklyBuyCount: 1
    };

    const updateClause = {
      '$set': {
        'tickers.$.buyCount': ticker.buyCount + 10,
        'tickers.$.currentCount': ticker.currentCount + 10,
        'tickers.$.dailyBuyCount': ticker.dailyBuyCount + 10,
        'tickers.$.weeklyBuyCount': ticker.weeklyBuyCount + 10
      }
    };

    const options = {
      new: true,
      passRawResult: true
    };

    await updateTickerBuy('AAPL', 10);
    expect(tickerModel.findOneAndUpdate).toHaveBeenCalledWith(
      {'tickers.symbol': 'AAPL'},
      updateClause,
      options
    );
  });

  it('should call findOneAndUpdate with the correct information', async function () {
    let ticker = {
      sellCount: 22,
      currentCount: 14
    };

    const updateClause = {
      '$set': {
        'tickers.$.sellCount': ticker.sellCount + 10,
        'tickers.$.currentCount': ticker.currentCount - 10
      }
    };

    const options = {
      new: true,
      passRawResult: true
    };

    await updateTickerSell('AAPL', 10);
    expect(tickerModel.findOneAndUpdate).toHaveBeenCalledWith(
      {'tickers.symbol': 'AAPL'},
      updateClause,
      options
    );
  });
});
