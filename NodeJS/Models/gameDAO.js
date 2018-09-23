import mongoose from 'mongoose';

// create a schema - this is like a blueprint
export const gameSchema = new mongoose.Schema({
  code: String,
  game_name: String,
  leader_email: String,
  starting_amount: Number,
  trade_limit: Number,
  start_time: Date,
  end_time: Date,
  active_players: Array
});

let gameModel = mongoose.model('Game', gameSchema);

export function createGame(game) {
  return new Promise((resolve, reject) => {
    for (let i in game) {
      if (game.hasOwnProperty(i)) {
        console.log(game[i]);
        if (game[i] == '') {
          reject('Each field must have information');
        }
      }
    }

    gameModel.create(game, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

export function addUserToGame(uid, gameCode) {
  return new Promise((resolve, reject) => {
    gameModel.findOneAndUpdate({code: gameCode}, {$push: {active_players: uid}}, {new: true}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export function getGamesByUser(uid) {
  const findClause = {active_players: uid};
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
