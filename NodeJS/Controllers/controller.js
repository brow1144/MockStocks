import bodyParser from 'body-parser';
import {getUsers} from '../Models/testMongo'; // must import models that we need
import {getStock, getTickers, loadTickers} from '../Models/stockDAO';

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
    buildResponse(res, data);
  });

  app.get('/Portfol.io/SignIn', async (req, res) => {

  });

  app.get('/Portfol.io/CreateAccount', async (req, res) => {

  });

  // Period is in the format : 'Monthly', 'Weekly', 'Daily', etc. Casing is important here.
  app.get('/Portfol.io/Stock/:stock/:period', async (req, res) => {
    const data = await getStock(req.params.stock, req.params.period);
    buildResponse(res, data);
  });

  // WARNING : only call this if the database of tickers is down. It is a very large file to save into mongo and is better that it is untouched for now
  app.get('/Portfol.io/LoadTickers', async (req, res) => {
    const data = await loadTickers();
    buildResponse(res, data);
  });

  app.get('/Portfol.io/GetTickers', async (req, res) => {
    const data = await getTickers();
    buildResponse(res, data);
  });
};

const buildResponse = (res, data) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  data && res.status(200).json(data);
};
