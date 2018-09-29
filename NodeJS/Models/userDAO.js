import mongoose from 'mongoose';
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

  // TODO check if the user is already in game
  return userModel.findOneAndUpdate(
    {_id: uid},
    {$push: {active_games: game}},
    {new: true})
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
