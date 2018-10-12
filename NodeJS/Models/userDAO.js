import mongoose from 'mongoose';
import {userModel} from '../utilities/MongooseModels';
import {getGame} from './gameDAO';
import _ from 'lodash';
import {getStockBatch, updateTickerBuy, updateTickerSell} from "./stockDAO";

export function getUser(uid) {
  return userModel.findOne({_id: uid})
    .then((user) => {
      if (user)
        return Promise.resolve(user);
      else
        return Promise.reject('UserError: User not found');
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function getAllUsers() {
  return userModel.find({})
    .then((users) => {
      if (users)
        return Promise.resolve(users);
      else
        return Promise.reject('No users found');
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function createUser(user) {
  for (let i in user) {
    if (user.hasOwnProperty(i)) {
      if (user[i] === undefined)
        return Promise.reject('UserError: One or more fields are missing');
      else if (user[i] === '')
        return Promise.reject('UserError: Each field must have information');
    }
  }

  return userModel.create(user)
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function joinGame(uid, gameCode, starting_amount) {
  const game = {
    code: gameCode,
    buying_power: starting_amount,
    trade_count: 0,
    stocks: [],
    value_history: []
  };

  const updateClause = {
    'game.code': {'$ne': gameCode},
    '$addToSet': {'active_games': game}
  };

  const options = {
    new: true,
    passRawResult: true
  };

  return userModel.findOneAndUpdate(
    {_id: uid},
    updateClause,
    options)
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export function leaveGame(uid, gameCode) {
  const options = {
    new: true,
    passRawResult: true
  };

  return userModel.findOneAndUpdate(
    {_id: uid},
    {'$pull': {'active_games': {'code': gameCode}}},
    options)
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function updateUserBuyingPower(uid, gameCode, starting_amount) {
  const findClause = {
    '_id': uid,
    'active_games.code': gameCode
  };

  const options = {
    new: true,
    passRawResult: true
  };

  return userModel.findOneAndUpdate(
    findClause,
    {'$set': {'active_games.$.buying_power': parseFloat(parseFloat(starting_amount).toFixed(2))}},
    options)
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function buyStock(uid, gameCode, stockName, quantity, pricePerShare) {
  quantity = Number(quantity);
  pricePerShare = parseFloat(pricePerShare).toFixed(2);

  let game;
  let userGame;
  let buying_power;
  let originalQuantity = quantity;

  try {
    game = await getGame(gameCode);
    userGame = await getUserGame(uid, gameCode);

    game = game[0];
  } catch (error) {
    return Promise.reject(error);
  }

  if (userGame.trade_count >= game.trade_limit && game.trade_limit !== 0)
    return Promise.reject('UserError: Trade limit exceeded');

  const price = quantity * pricePerShare;
  if (userGame.buying_power >= price)
    buying_power = userGame.buying_power - price;
  else
    return Promise.reject('UserError: Insufficient buying power');

  for (let i in userGame.stocks) {
    if (userGame.stocks.hasOwnProperty(i)) {
      if (userGame.stocks[i].name === stockName) {
        try {
          await removeStock(uid, gameCode, stockName, userGame.stocks[i].quantity);
          quantity += userGame.stocks[i].quantity;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
  }

  const stock = {
    name: stockName,
    quantity: quantity
  };

  const findClause = {
    '_id': uid,
    'active_games.code': gameCode
  };

  const updateClause = {
    '$inc': {'active_games.$.trade_count': 1},
    '$set': {'active_games.$.buying_power': buying_power},
    '$push': {'active_games.$.stocks': stock}
  };

  const options = {
    new: true,
    passRawResult: true
  };

  return userModel.findOneAndUpdate(
    findClause,
    updateClause,
    options)
    .then(async (updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      try {
        await updateTickerBuy(stockName, originalQuantity);
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function sellStock(uid, gameCode, stockName, quantity, pricePerShare) {
  quantity = Number(quantity);
  pricePerShare = Number(pricePerShare);

  let game;
  let userGame;
  let buying_power;
  let originalQuantity = quantity;

  try {
    game = await getGame(gameCode);
    userGame = await getUserGame(uid, gameCode);

    game = game[0];
  } catch (error) {
    return Promise.reject(error);
  }

  if (userGame.trade_count >= game.trade_limit && game.trade_limit !== 0)
    return Promise.reject('UserError: Trade limit exceeded');

  const price = quantity * pricePerShare;
  buying_power = userGame.buying_power + price;

  let owned;
  for (let i in userGame.stocks) {
    if (userGame.stocks.hasOwnProperty(i)) {
      if (userGame.stocks[i].name === stockName) {
        owned = true;

        if (userGame.stocks[i].quantity < quantity)
          return Promise.reject('UserError: User does not own ' + quantity + ' shares of ' + stockName);

        try {
          await removeStock(uid, gameCode, stockName, userGame.stocks[i].quantity);
          quantity = userGame.stocks[i].quantity - quantity;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }
  }

  if (!owned)
    return Promise.reject('UserError: User does not own ' + stockName);

  const stock = {
    name: stockName,
    quantity: quantity
  };

  const findClause = {
    '_id': uid,
    'active_games.code': gameCode
  };

  let updateClause;

  if (quantity > 0) {
    updateClause = {
      '$inc': {'active_games.$.trade_count': 1},
      '$set': {'active_games.$.buying_power': buying_power},
      '$push': {'active_games.$.stocks': stock}
    };
  } else {
    updateClause = {
      '$inc': {'active_games.$.trade_count': 1},
      '$set': {'active_games.$.buying_power': buying_power}
    };
  }

  const options = {
    new: true,
    passRawResult: true
  };

  return userModel.findOneAndUpdate(
    findClause,
    updateClause,
    options)
    .then(async (updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      try {
        await updateTickerSell(stockName, originalQuantity);
      } catch (error) {
        return Promise.reject(error);
      }

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

// removes existing stock object to update database when buying or selling
export function removeStock(uid, gameCode, stockName, quantity) {
  const stock = {
    name: stockName,
    quantity: quantity
  };

  const findClause = {
    '_id': uid,
    'active_games.code': gameCode
  };

  const options = {
    new: true,
    passRawResult: true
  };

  return userModel.findOneAndUpdate(
    findClause,
    {'$pull': {'active_games.$.stocks': stock}},
    options)
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

// get user's information for a particular game object
export function getUserGame(uid, gameCode) {
  const returnClause = {
    '_id': 0, // exclude _id
    'active_games': {'$elemMatch': {'code': gameCode}}
  };

  return userModel.findOne({'_id': uid}, returnClause)
    .then((game) => {
      if (game && game.active_games[0])
        return Promise.resolve(game.active_games[0]);
      else
        return Promise.reject('UserError: User or game not found');
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function updateValueHistory(uid, gameCode, value, time) {
  const valueEntry = {
    value: value,
    time: time
  };

  const findClause = {
    '_id': uid,
    'active_games.code': gameCode
  };

  const options = {
    new: true,
    passRawResult: true
  };

  return userModel.findOneAndUpdate(
    findClause,
    {'$push': {'active_games.$.value_history': valueEntry}},
    options)
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export async function getValueHistory(uid, gameCode) {
  let userGame;

  try {
    userGame = await getUserGame(uid, gameCode);
  } catch (error) {
    return Promise.reject(error);
  }

  let graphData = [];
  for (let i in userGame.value_history) {
    if (userGame.value_history.hasOwnProperty(i)) {
      graphData.push({
        x: userGame.value_history[i].time,
        y: userGame.value_history[i].value
      });
    }
  }

  return Promise.resolve(graphData);
}

// used for cleaning up the database
export function clearValueHistory(uid, gameCode) {
  const findClause = {
    '_id': uid,
    'active_games.code': gameCode
  };

  const options = {
    new: true,
    passRawResult: true
  };

  return userModel.findOneAndUpdate(
    findClause,
    {'$set': {'active_games.$.value_history': []}},
    options)
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function getUserWatchlist(uid) {
  console.error(uid);
  return userModel.findOne({_id: uid})
    .then((foundUser) => {
      if (foundUser === null)
        return Promise.reject('UserError: User does not exist');
      return Promise.resolve(foundUser.watchlist);
    }).then((watchlist) => {
      console.error(watchlist);
      let batchCall = _.join(watchlist, ',');
      console.error(batchCall);
      return getStockBatch(batchCall);
    }).then((stocks) => {
      stocks = _.map(stocks, (stock) => {
        return {
          symbol: stock.quote.symbol,
          close: stock.quote.close,
          changePercent: stock.quote.changePercent
        };
      });
      return Promise.resolve(stocks);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function insertToUserWatchlist(uid, stockToInsert) {
  return userModel.findOneAndUpdate(
    {_id: uid}, {$push : {watchlist: stockToInsert}})
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');
      updatedUser.watchlist.push(stockToInsert);
      return Promise.resolve(updatedUser.watchlist);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export function removeFromUserWatchlist(uid, stockToInsert) {
  return userModel.findOneAndUpdate(
    {_id: uid}, {$pull : {watchlist: stockToInsert}})
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');
      updatedUser.watchlist.push(stockToInsert);
      return Promise.resolve(updatedUser.watchlist);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

