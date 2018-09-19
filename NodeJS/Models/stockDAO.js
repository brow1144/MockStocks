import axios from 'axios';
import mongoose from 'mongoose';


export function getStock(stockTicker, period) {
  period = period ? period : 'Monthly';
  return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_${period.toUpperCase()}_ADJUSTED&symbol=${stockTicker}&apikey=WIOGAHD0RJEEZ59V`)
    .then(function (response) {
      // handle success
      let stockData = [];
      // This api is inconsistent so apparently we need two different types of response
      let data = period === 'Daily' ? response.data[`Time Series (${period})`] : response.data[`${period} Adjusted Time Series`];

      for (let i in data) {
        stockData.unshift({
          x: new Date(i).getTime(),
          y: parseFloat(data[i]['5. adjusted close']),
        })
      }
      return Promise.resolve(stockData);
    })
    .catch(function (error) {
      console.log(error);
    })
}

const tickerSchema = new mongoose.Schema({
  tickers: Array
});
const tickerList = mongoose.model('Ticker', tickerSchema);

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
  const tickerList = mongoose.model('Ticker', tickerSchema);
  return tickerList.findOne({}, {tickers: 1, _id: 0}).catch((err) => {return Promise.reject(err)})
}