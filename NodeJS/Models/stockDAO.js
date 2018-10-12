import axios from 'axios';
import {tickerModel} from "../utilities/MongooseModels";

// TODO: IMPLEMENT REJECTIONS AND THEN WRITE TESTS FOR THEM

export function formatStocks(data, dateLimit) {
  let stockData = [];

  for (let i in data) {
    console.log(data[i]);
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
    let timeArr = data[i]['minute'].split(':');
    console.log(timeArr);
    let stockDate = new Date();
    stockDate.setHours(timeArr[0], timeArr[1]);
    stockDate = stockDate.getTime();
    stockData.unshift({
      x: stockDate,
      y: parseFloat(data[i]['close']),
    })
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
      return Promise.resolve(stockData);
    })
    .catch((error) => {
      console.log(error);
    })
}
// TODO : CHANGE THIS AWAY FROM BEING ITS OWN FUNCTION
export function getStockIntraday(stockTicker) {
  return axios.get(`https://api.iextrading.com/1.0/stock/${stockTicker}/chart/1d`)
    .then((response) => {
      // handle success
      // This api is inconsistent so apparently we need two different types of response
      let data = response.data;

      const stockData = formatDaily(data);
      return Promise.resolve(stockData);
    })
    .catch((error) => {
      console.log(error);
    })
}

 export function getStockBatch(stockList) {
   return axios.get(`https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${stockList}&apikey=WIOGAHD0RJEEZ59V`)
     .then((response) => {
       // handle success
       let data = response.data['Stock Quotes'];
       return Promise.resolve({stockQuotes: data});
     })
     .catch((error) => {
       console.log(error);
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
          company: ticker.name
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