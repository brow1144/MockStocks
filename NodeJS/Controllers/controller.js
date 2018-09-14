let bodyParser = require('body-parser');
let model = require('../Models/testMongo');

let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = (app) => {
  app.get('/Portfol.io/Home', async (req, res) => {
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
    //res.render('todo', {todos: data});

  });

  app.get('/Portfol.io/SignIn', async (req, res) => {

  });

  app.get('/Portfol.io/CreateAccount', async (req, res) => {

  });
};
