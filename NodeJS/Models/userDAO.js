import mongoose from 'mongoose';
import {gameSchema} from './gameDAO';

export const userSchema = new mongoose.Schema({
  _id: String,
  first_name: String,
  last_name: String,
  email: String,
  active_games: Array,
  owned_stocks: Array,
  watchlist: Array
});

let userModel = mongoose.model('User', userSchema);
let gameModel = mongoose.model('Game', gameSchema);

export function getUser(userEmail) {
  return new Promise((resolve, reject) => {
    userModel.findOne({email: userEmail}, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

export function addUser(user) {
  return new Promise((resolve, reject) => {
    // const {first_name, last_name, email, username, active_games, pending_games,
    //   completed_games, owned_stocks, trade_history, watchlist} = user;

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

function getGame(code) {
  return new Promise(function(resolve, reject) {
    gameModel.findOne({code: code}, (err, game) => {
      if (err) reject(err);
      resolve(game);
    })
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
