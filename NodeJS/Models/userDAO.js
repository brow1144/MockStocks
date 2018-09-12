let mongoose = require('mongoose');

// create a schema - this is like a blueprint
let userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  active_games: [],
  pending_games: [],
  completed_games: [],
  owned_stocks: [],
  trade_history: [],
  watchlist: []
});

let user = mongoose.model('User', userSchema);

module.exports = {
  getStocks: function() {
    // return new Promise((resolve, reject) => {
    //   user.find({}, (err, user) => {
    //     if (err) reject(err);
    //     resolve(user.);
    //   });
    // });
  },

  getItems: function() {
    // get data from mongodb
    return new Promise((resolve, reject) => {

    });
  },

  addItem: function(item) {
    // add item to mongodb and return new data
    return new Promise((resolve, reject) => {

    });
  },

  deleteItem: function(item) {
    // delete item from mongodb and return new data
    return new Promise((resolve, reject) => {

    });
  }
};
