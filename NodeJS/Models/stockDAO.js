import axios from 'axios';
import {tickerModel} from "../utilities/MongooseModels";
import _ from 'lodash';

export function formatStocks(data, dateLimit) {
  let stockData = [];

  for (let i in data) {
    if (!data[i]['close']) continue;
    const stockDate = new Date(data[i]['date']).getTime();
    if (!dateLimit || stockDate >= dateLimit) {
      stockData.unshift({
        x: stockDate,
        y: parseFloat(data[i]['close']),
      })
    }
  }
  return stockData;
}

export function formatDaily(data) {
  let stockData = [];
  for (let i in data) {
    if (!data[i]['close']) continue;
    let timeArr = data[i]['minute'].split(':');
    let stockDate = new Date();
    stockDate.setHours(timeArr[0], timeArr[1]);
    stockDate = stockDate.getTime();
    stockData.unshift({
      x: stockDate,
      y: parseFloat(data[i]['close']),
    });
  }
  return stockData;
}

export function getStock(stockTicker, period, dateLimit) {
  return axios.get(`https://api.iextrading.com/1.0/stock/${stockTicker}/chart/${period}`)
    .then((response) => {
      // handle success
      // This api is inconsistent so apparently we need two different types of response
      let data = response.data;
      const stockData = formatStocks(data, dateLimit);
      _.sortBy(stockData, (stock) => {
        return stock.x
      });
      stockData.reverse();
      return Promise.resolve(stockData);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
}

export function getStockIntraday(stockTicker) {
  return axios.get(`https://api.iextrading.com/1.0/stock/${stockTicker}/chart/1d`)
    .then((response) => {
      // handle success
      // This api is inconsistent so apparently we need two different types of response
      let data = response.data;

      const stockData = formatDaily(data);
      _.sortBy(stockData, (stock) => {
        return stock.x
      });
      stockData.reverse();
      return Promise.resolve(stockData);
    })
    .catch((error) => {
      return Promise.reject('UserError: Stock not found');
    })
}

export function getStockBatch(stockList) {
  return axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockList}&types=quote`)
    .then((response) => {
      // handle success
      let data = response.data;
      return Promise.resolve(data);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
}


// in theory this will only be called the one time. If something every happens to the db recall it
// https://iextrading.com/api-exhibit-a
// https://iextrading.com/developer/docs/#attribution
export function loadTickers() {
  // credit to IEXTrading for the data for all available stock tickers from their Free API
  return axios.get(`https://api.iextrading.com/1.0/ref-data/symbols`)
    .then(function (response) {
      // handle success
      let data = response.data;
      const tickers = data.map(ticker => {
        return {
          symbol: ticker.symbol,
          company: ticker.name,
          buyCount: 0,
          sellCount: 0,
          currentCount: 0,
          dailyBuyCount: 0,
          weeklyBuyCount: 0
        };
      });
      //const tickMod = new tickerModel({tickers: tickers});
      // tickMod.save() this is the original code to save the entry, however instead of making a new entry each time I just updated it so we would update the one entry.
      return tickerModel.updateOne({}, {$set: {tickers: tickers}}).catch(err => {
        return Promise.reject(err);
      });
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    })
}

export function getTickers() {
  return tickerModel.findOne({}, {tickers: 1, _id: 0}).catch((err) => {
    return Promise.reject(err)
  })
}

export function getTicker(name) {
  return tickerModel.findOne({'tickers.symbol': name}, {'tickers.$': 1, '_id': 0})
    .then((ticker) => {
      return Promise.resolve(ticker.tickers[0]);
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

export async function getTrendingStocks(timePeriod) {
  let tickers;
  try {
    tickers = await getTickers();
    tickers = tickers.toObject().tickers;
  } catch (error) {
    return Promise.reject(error);
  }

  if (timePeriod === 'day') {
    tickers.sort(sortByDaily());
    let topTen = [];
    for (let i = 0; i < 10; i++){
      topTen.push(tickers[i]);
    }
    // DEFECT #20 shuffle the array of top ten so it isn't in the proper order
    return Promise.resolve(_.shuffle(topTen));
  }

  else if (timePeriod === 'week') {
    tickers.sort(sortByWeekly());
    let topTen = new Array();
    for (let i = 0; i < 10; i++){
      topTen.push(tickers[i]);
    }
    return Promise.resolve(topTen);
  }
}

function sortByDaily() {
  return function (a, b) {
    return b.dailyBuyCount - a.dailyBuyCount;
  }
}

function sortByWeekly() {
  return function (a, b) {
    return b.weeklyBuyCount - a.weeklyBuyCount;
  }
}

export async function updateTickerBuy(name, quantity) {
  let ticker;

  try {
    ticker = await getTicker(name);
  } catch (error) {
    return Promise.reject(error);
  }

  const updateClause = {
    '$set': {
      'tickers.$.buyCount': ticker.buyCount + quantity,
      'tickers.$.currentCount': ticker.currentCount + quantity,
      'tickers.$.dailyBuyCount': ticker.dailyBuyCount + quantity,
      'tickers.$.weeklyBuyCount': ticker.weeklyBuyCount + quantity
    }
  };

  const options = {
    new: true,
    passRawResult: true
  };

  return tickerModel.findOneAndUpdate(
    {'tickers.symbol': name},
    updateClause,
    options)
    .then((updatedTicker) => {
      if (updatedTicker === null)
        return Promise.reject('UserError: Ticker not found');

      return Promise.resolve(updatedTicker);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export async function updateTickerSell(name, quantity) {
  let ticker;

  try {
    ticker = await getTicker(name);
  } catch (error) {
    return Promise.reject(error);
  }

  const updateClause = {
    '$set': {
      'tickers.$.sellCount': ticker.sellCount + quantity,
      'tickers.$.currentCount': ticker.currentCount - quantity
    }
  };

  const options = {
    new: true,
    passRawResult: true
  };

  return tickerModel.findOneAndUpdate(
    {'tickers.symbol': name},
    updateClause,
    options)
    .then((updatedTicker) => {
      if (updatedTicker === null)
        return Promise.reject('UserError: Ticker not found');

      return Promise.resolve(updatedTicker);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
