import mongoose from 'mongoose';
import {gameModel, userModel} from '../utilities/MongooseModels';
import {updateUserBuyingPower, getUser} from './userDAO';
import {getStockBatch} from './stockDAO';

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
  game.completed = false;

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

export function completeGame(gameCode) {
  return gameModel.findOneAndUpdate(
    {code: gameCode},
    {'completed': true})
    .catch((err) => {
      console.error(err);
    });
}

async function getUsersInGame(gameCode) {
  let game;
  try {
    game = await getGame(gameCode);
    game = game[0];
  } catch (error) {
    return Promise.reject(error);
  }

  let users = game.active_players.toObject();
  let userObjList = [];
  for (let i in users) {
    if (users.hasOwnProperty(i)) {
      try {
        let user = await getUser(users[i]);
        userObjList.push(user);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }

  return Promise.resolve(userObjList);
}

export async function getTotalValues(gameCode) {
  let valueList = [];

  try {
    let gameObj = await getGame(gameCode);
    let completed = gameObj[0].completed;

    let users = await getUsersInGame(gameCode);
    let stockMap = [];

    for (let i in users) {
      if (users.hasOwnProperty(i)) {
        let games = users[i].active_games.toObject();

        if (completed)
          games = users[i].completed_games.toObject();

        for (let j in games) {
          if (games.hasOwnProperty(j) && games[j].code === gameCode) {
            let game = games[j];
            let stockString = '';
            let stocksInGame = [];
            let totalValue;

            if (completed) {
              if (game.value_history)
                totalValue = game.value_history[game.value_history.length - 1].value;
              else
                totalValue = game.buying_power;
            } else {
              for (let k in game.stocks) {
                if (game.stocks.hasOwnProperty(k)) {
                  let exists = stockMap.some((stock) => {
                    return stock.name === game.stocks[k].name;
                  });

                  if (!exists) {
                    if (stockString.length === 0)
                      stockString += game.stocks[k].name;
                    else
                      stockString += ', ' + game.stocks[k].name;

                    stocksInGame.push({
                      name: game.stocks[k].name,
                      quantity: game.stocks[k].quantity,
                      price: 0
                    });
                  } else {
                    stocksInGame.push({
                      name: game.stocks[k].name,
                      quantity: game.stocks[k].quantity,
                      price: stockMap.find((stock) => stock.name === game.stocks[k].name).price
                    });
                  }
                }
              }

              if (stockString.length > 0) {
                let data = await getStockBatch(stockString);

                for (let k in data) {
                  if (data.hasOwnProperty(k)) {
                    let stockObj = {
                      name: data[k].quote.symbol,
                      price: data[k].quote.latestPrice
                    };

                    stockMap.push(stockObj);
                    stocksInGame.find((stock) => stock.name === stockObj.name).price = stockObj.price;
                  }
                }
              }

              totalValue = game.buying_power;

              for (let k in stocksInGame) {
                if (stocksInGame.hasOwnProperty(k))
                  totalValue += stocksInGame[k].quantity * stocksInGame[k].price;
              }
            }

            valueList.push({
              player: users[i]._id,
              value: totalValue
            });
          }
        }
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(valueList);
}

export async function getWinner(gameCode) {
  let totalValues;

  try {
    totalValues = await getTotalValues(gameCode);
    console.log(totalValues);
  } catch (error) {
    return Promise.reject(error);
  }

  let winner;
  let maxValue = 0;
  for (let i in totalValues) {
    if (totalValues.hasOwnProperty(i) && totalValues[i].value > maxValue) {
      winner = totalValues[i];
      maxValue = totalValues[i].value;
    }
  }

  return Promise.resolve(winner);
}
