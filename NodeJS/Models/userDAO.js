import mongoose from 'mongoose';
import {userSchema} from '../utilities/MongooseSchemas';
import {userModel} from '../utilities/MongooseModels';
import {getGame} from './gameDAO';

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
};

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
};

export function joinGame(uid, gameCode, starting_amount) {
  const game = {
    code: gameCode,
    buying_power: starting_amount,
    trade_count: 0,
    stocks: []
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
};

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
    {'$set': {'active_games.$.buying_power': starting_amount}},
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

export async function buyStock(uid, gameCode, stockName, quantity, pricePerShare) {
  quantity = Number(quantity);
  pricePerShare = Number(pricePerShare);

  let game;
  let userGame;
  let buying_power;

  try {
    game = await getGame(gameCode);
    userGame = await getUserGame(uid, gameCode);

    game = game[0];
    userGame = userGame.active_games[0];
  } catch (error) {
    return Promise.reject(error);
  }

  if (userGame.trade_count >= game.trade_limit) {
    return Promise.reject('UserError: Trade limit exceeded');
  }

  const price = quantity * pricePerShare;
  if (userGame.buying_power >= price) {
    buying_power = userGame.buying_power - price;
  } else {
    return Promise.reject('UserError: Insufficient buying power');
  }

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
    .then((updatedUser) => {
      if (updatedUser === null)
        return Promise.reject('UserError: User does not exist');

      return Promise.resolve(updatedUser);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export function getUserGame(uid, gameCode) {
  const returnClause = {
    '_id': 0, // exclude _id
    'active_games': {'$elemMatch': {'code': gameCode}}
  };

  return userModel.findOne({'_id': uid}, returnClause)
    .then((game) => {
      if (game)
        return Promise.resolve(game);
      else
        return Promise.reject('UserError: User or game not found');
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

// removes existing stock object to update database when buying
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
};
