import mongoose from 'mongoose';
import {gameSchema} from './gameDAO';

export const userSchema = new mongoose.Schema({
  _id: String,
  username: String
  email: String,
  active_games: Array,
  watchlist: Array
});

let userModel = mongoose.model('User', userSchema);
let gameModel = mongoose.model('Game', gameSchema);

export function getUser(uid) {
  return new Promise((resolve, reject) => {
    userModel.findOne({_id: uid}, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

export function createUser(user) {
  return new Promise((resolve, reject) => {

    // TODO error checking
    for (let i in user) {
      if (user.hasOwnProperty(i)) {
        console.log(user[i]);
        if (user[i] == '') {
          reject('Each field must have information');
        }

      }
    }

    userModel.create(user, (err, response) => {
      if (err) reject(err);
      resolve(response);
    });
  });
};

export function joinGame(uid, gameCode) {
  const game = {
    code: gameCode,
    stocks: []
  };

  // TODO check if the user is already in game
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate({_id: uid}, {$push: {active_games: game}}, {new: true}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

function getGame(code) {
  return new Promise((resolve, reject) => {
    gameModel.findOne({code: code}, (err, game) => {
      if (err) reject(err);
      resolve(game);
    });
  });
}

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
