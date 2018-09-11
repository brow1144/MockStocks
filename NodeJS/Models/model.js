let mongoose = require('mongoose');

// create a schema - this is like a blueprint
let todoSchema = new mongoose.Schema({
  item: String
});

let Todo = mongoose.model('Todo', todoSchema);

module.exports = {
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
