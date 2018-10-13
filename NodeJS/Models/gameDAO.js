import mongoose from 'mongoose';
import {gameModel, userModel} from '../utilities/MongooseModels';
import {updateUserBuyingPower} from './userDAO';

export function createGame(game) {
  for (let i in game) {
    if (game.hasOwnProperty(i)) {
      if (game[i] === undefined)
        return Promise.reject('UserError: One or more fields are missing');
      else if (game[i] === '')
        return Promise.reject('UserError: Each field must have information');
    }
  }

  game.starting_amount = parseFloat(parseFloat(game.starting_amount).toFixed(2));

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
    {
      game_name: game.game_name,
      starting_amount: parseFloat(parseFloat(game.starting_amount).toFixed(2)),
      trade_limit: game.trade_limit,
      start_time: game.start_time,
      end_time: game.end_time
    },
    options)
    .then(async (updatedGame) => {
      if (updatedGame === null)
        return Promise.reject('UserError: Game does not exist');

      // update buying power for each active player
      for (let i in updatedGame.active_players.toObject()) {
        if (updatedGame.active_players.hasOwnProperty(i)) {
          try {
            await updateUserBuyingPower(updatedGame.active_players[i], gameCode, game.starting_amount);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }

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
        return Promise.reject('UserError: Game does not exist');

      if (originalGame.active_players.includes(uid))
        return Promise.reject('UserError: User already in game');

      return Promise.resolve(originalGame);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function removeUserFromGame(uid, gameCode) {
  return gameModel.findOneAndUpdate(
    {code: gameCode},
    {'$pull': {'active_players': uid}},
    {passRawResult: true})
    .then((originalGame) => {
      if (originalGame === null)
        return Promise.reject('UserError: Game does not exist');

      if (!originalGame.active_players.includes(uid))
        return Promise.reject('UserError: User is not in game');

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
    .catch((err) => {
      return Promise.reject(err)
    });
}

// do we need this?
export function getGamesById(gameId) {
  const tickerList = mongoose.model('Ticker', tickerSchema);
  return tickerList.find({}, {tickers: 1, _id: 0}).catch((err) => {
    return Promise.reject(err)
  })
}

export function getGame(gameCode) {
  return gameModel.find({'code': gameCode})
    .then((game) => {
      if (game)
        return Promise.resolve(game);
      else
        return Promise.reject('UserError: Game not found');
    })
    .catch((err) => {
      return Promise.reject(err)
    });
}

export function getAllGames() {
  return gameModel.find({})
    .then((games) => {
      if (games)
        return Promise.resolve(games);
      else
        return Promise.reject('No users found');
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
