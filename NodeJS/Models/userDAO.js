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

export function joinGame(uid, gameCode) {
  const game = {
    code: gameCode,
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
