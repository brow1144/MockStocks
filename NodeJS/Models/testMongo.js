import mongoose from 'mongoose';

// must match/describe data in the collection
const UserSchema = new mongoose.Schema({
  // first_name: {
  //   type: String,
  //   required: true
  // },
  // last_name: {
  //   type: String,
  //   required: true
  // },
  // username: {
  //   type: String,
  //   required: true
  // }//,
  // // active_games: {
  // //   type: Array
  // // },
  // // watchlist: {
  // //   type: Array
  // // }

  first_name: String,
  last_name: String,
  username: String
});

// name in quotes is the collection, it's singular version and it changes to plural and lowercase because fuck Mongodb
const User = mongoose.model('User', UserSchema);

// these functions will be called in the appropriate controller
export function getUsers() {
  // made the db calls into promises because its good practice
  return new Promise((resolve, reject) => {
    // find() is one of the mongoose functions, just look at the docs for the other ones
    User.find({}, (err, users) => { // you would enter conditions in the brackets to find specific items
      if (err) reject(err);
      resolve(users);
    });
  });
};
