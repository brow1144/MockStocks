import bodyParser from 'body-parser';
import {getUsers} from '../Models/testMongo'; // must import models that we need

let urlencodedParser = bodyParser.urlencoded({extended: false});

export default (app) => {
  // heres the endpoints obviously
  app.get('/Portfol.io/Home', async (req, res) => {
    // get data from mongodb and pass it to view

    // Method #2 - then
    /*todoModel.getItems().then(function(data) {
      res.render('todo', {todos: data});
    });*/

    // Method #3 - async/await
    // async await looks slick so ive been doing it but method 2 is just as valid
    let data = await getUsers();
    console.log("got it: " + data);
    res.status(200).json(data);
  });

  app.get('/Portfol.io/SignIn', async (req, res) => {

  });

  app.get('/Portfol.io/CreateAccount', async (req, res) => {

  });
};
