import mongoose from 'mongoose';
import {gameModel} from '../utilities/MongooseModels';

export function createGame(game) {
  for (let i in game) {
    if (game.hasOwnProperty(i)) {
      if (game[i] === undefined)
        return Promise.reject('UserError: One or more fields are missing');
      else if (game[i] === '')
        return Promise.reject('UserError: Each field must have information');
    }
  }

  return gameModel.create(game)
    .then((res) => {
      return Promise.resolve(res)
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function updateGameSettings(gameCode, game) {
  for (let i in game) {
    if (game.hasOwnProperty(i)) {
      if (game[i] === undefined)
        return Promise.reject('UserError: One or more fields are missing');
      else if (game[i] === '')
        return Promise.reject('UserError: Each field must have information');
    }
  }

  const options = {
    new: true,
    passRawResult: true
  };

  return gameModel.findOneAndUpdate(
    {code: gameCode},
    {game_name: game.game_name,
    starting_amount: game.starting_amount,
    trade_limit: game.trade_limit,
    start_time: game.start_time,
    end_time: game.end_time},
    options)
    .then((updatedGame) => {
      if (updatedGame === null)
        return Promise.reject('Game does not exist');

      return Promise.resolve(updatedGame);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function addUserToGame(uid, gameCode) {
  return gameModel.findOneAndUpdate(
    {code: gameCode},
    {'$addToSet': {'active_players': uid}},
    {passRawResult: true})
    .then((originalGame) => {
      if (originalGame === null)
        return Promise.reject('Game does not exist');

      if (originalGame.active_players.includes(uid))
        return Promise.reject('User already in game');

      return Promise.resolve(originalGame);
    })
    .catch((err) => {
      return Promise.reject(err);
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
