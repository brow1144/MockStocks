import mongoose from 'mongoose';
import {gameModel} from '../utilities/MongooseModels';



export function createGame(game) {
  return new Promise((resolve, reject) => {
    for (let i in game) {
      if (game.hasOwnProperty(i)) {
        console.log(game[i]);
        if (game[i] === '') {
          reject('Each field must have information');
        }
      }
    }

    gameModel.create(game, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
}

export function addUserToGame(uid, gameCode) {
  return new Promise((resolve, reject) => {
    gameModel.findOneAndUpdate({code: gameCode}, {$push: {active_players: uid}}, {new: true}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

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

// function getGame(code) {
//   return new Promise((resolve, reject) => {
//     gameModel.findOne({code: code}, (err, game) => {
//       if (err) reject(err);
//       resolve(game);
//     });
//   });
// }
