import mongoose from 'mongoose';
import {userModel} from '../utilities/MongooseModels';

//import {gameSchema} from './gameDAO';

// export const userSchema = new mongoose.Schema({
//   _id: String,
//   active_games: Array,
//   watchlist: Array,
//   username: { // TODO unique keys not working, maybe restart cluster
//     type: String,
//     unique: true
//   },
//   email: {
//     type: String,
//     unique: true
//   }
// });

//let userModel = mongoose.model('User', userSchema);
//let gameModel = mongoose.model('Game', gameSchema);

export function getUser(uid) {
  userModel.findOne({_id: uid})
    .then((user) => {
      if (user)
        resolve(user);
      else
        reject('UserError: User not found');
    })
    .catch((err) => {
      reject(err);
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

  userModel.create(user)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });

  // return new Promise((resolve, reject) => {
  //   for (let i in user) {
  //     if (user.hasOwnProperty(i)) {
  //       if (user[i] === undefined)
  //         reject('UserError: One or more fields are missing');
  //       else if (user[i] === '')
  //         reject('UserError: Each field must have information');
  //     }
  //   }
  //
  //   userModel.create(user, (err, response) => {
  //     if (err) reject(err);
  //     resolve(response);
  //   });
  // });
};

export function joinGame(uid, gameCode) {
  const game = {
    code: gameCode,
    stocks: []
  };

  userModel.findOneAndUpdate(
    {_id: uid},
    {$push: {active_games: game}},
    {new: true})
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });


  // // TODO check if the user is already in game
  // return new Promise((resolve, reject) => {
  //   userModel.findOneAndUpdate({_id: uid}, {$push: {active_games: game}}, {new: true}, (err, result) => {
  //     if (err) reject(err);
  //     resolve(result);
  //   });
  // });
};

// export function getActiveGames(userEmail) {
//   return new Promise((resolve, reject) => {
//     userModel.findOne({email: userEmail}, 'active_games', async (err, response) => {
//       if (err) reject(err);
//
//       response = response.toObject();
//       let gamesList = response.active_games;
//       let games = [];
//
//       for (let i in gamesList) {
//         if (gamesList.hasOwnProperty(i)) {
//           let game = await getGame(gamesList[i]);
//
//           if (game != null)
//             games.push(game);
//         }
//       }
//
//       resolve(games);
//     });
//   });
// };
