let bodyParser = require('body-parser');
let model = require('../Models/model');

let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
  app.get('/todo', async (req, res) => { // NOTE: async is only needed when using Method #3
    // get data from mongodb and pass it to view

    // Method #1 - callback function - ***don't use***
    /*todoModel.getItems(function(data) {
      res.render('todo', {todos: data});
    });*/

    // Method #2 - then
    /*todoModel.getItems().then(function(data) {
      res.render('todo', {todos: data});
    });*/

    // Method #3 - async/await
    let data = await model.getItems();
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, async (req, res) => {
    // get item from view and add it to mongodb
    let data = await model.addItem(req.body);
    res.json(data);
  });

  app.delete('/todo/:item', async (req, res) => {
    // delete the requested item from mongodb
    let data = await model.deleteItem(req.params.item);
    res.json(data);
  });
};
