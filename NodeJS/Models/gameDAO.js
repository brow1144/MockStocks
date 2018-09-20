import mongoose from 'mongoose';

// create a schema - this is like a blueprint
const gameSchema = new mongoose.Schema({
  active_players: Array,
  starting_amount: Number,
  trade_limit: Number,
  start_time: Number,
  end_time: Number
});


export function getGamesByUser(uid) {
  const findClause = {active_players: {$elemMatch: {uid: uid}}};
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