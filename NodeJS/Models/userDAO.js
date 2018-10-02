import mongoose from 'mongoose';
import {userSchema} from '../utilities/MongooseSchemas';
import {userModel} from '../utilities/MongooseModels';

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

export async function buyStock(uid, gameCode, stockName, quantity, totalQuantity) {
  const stock = {
    name: stockName,
    quantity: parseInt(totalQuantity)
  };

  const findClause = {
    '_id': uid,
    'active_games.code': gameCode
  };

  const currentQuantity = parseInt(totalQuantity) - parseInt(quantity);
  await removeStock(uid, gameCode, stockName, currentQuantity);

  const updateClause = {
    '$inc': {'active_games.$.trade_count': 1},
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

export function removeStock(uid, gameCode, stockName, quantity) {
  const stock = {
    name: stockName,
    quantity: quantity
  };

  const findClause = {
    '_id': uid,
    'active_games.code': gameCode
  };

  const updateClause = {
    '$pull': {'active_games.$.stocks': stock}
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
