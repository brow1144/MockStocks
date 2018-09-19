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

// const gameSchema = new mongoose.Schema({
//
// });
// const tickerList = mongoose.model('Ticker', tickerSchema);
//
// export function loadTickers() {
//   return axios.get(`https://api.iextrading.com/1.0/ref-data/symbols`)
//     .then(function (response) {
//       // handle success
//       let data = response.data;
//       const tickers = data.map(ticker => {
//         return {
//           symbol: ticker.symbol,
//           company: ticker.name
//         };
//       });
//       //const tickMod = new tickerModel({tickers: tickers});
//       // tickMod.save() this is the original code to save the entry, however instead of making a new entry each time I just updated it so we would update the one entry.
//       return tickerModel.updateOne({}, {$set: {tickers: tickers}}).catch(err => {
//         return Promise.reject(err);
//       });
//     })
//     .catch(function (error) {
//       console.log(error);
//       return Promise.reject(error);
//     })
// }

// create a schema - this is like a blueprint
const gameSchema = new mongoose.Schema({
  active_players: Array,
  starting_amount: Number,
  trade_limit: Number,
  start_time: Number,
  end_time: Number
});


export function getGamesByUser(email) {
  const findClause = {active_players: {$elemMatch: {email: email}}};
  let gameModel = mongoose.model('Game', gameSchema);
  return gameModel.find(findClause)
    .then((data) => {
      return Promise.resolve({games: data});
    })
    .catch((err) => {return Promise.reject(err)})
}
export function getGamesById(gameId) {
  const tickerList = mongoose.model('Ticker', tickerSchema);
  return tickerList.find({}, {tickers: 1, _id: 0}).catch((err) => {return Promise.reject(err)})
}