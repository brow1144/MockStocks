import bodyParser from 'body-parser';
import {getStock, getStockBatch, getTickers, loadTickers} from '../Models/stockDAO';
import {getGamesByUser} from "../Models/gameDAO";
import {getUsers, addUser} from '../Models/userDAO';

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
    //let data = await getUsers();
    //buildResponse(res, data);
  });

  // Period is in the format : 'Monthly', 'Weekly', 'Daily', etc. Casing is important here.
  app.get('/Portfol.io/Stock/:stock/:period', async (req, res) => {
    const data = await getStock(req.params.stock, req.params.period);
    buildResponse(res, data);
  });

  // stockList is in the format of comma separated tickers
  app.get('/Portfol.io/Batch/Stock/:stockList', async (req, res) => {
    console.error('Hello');
    console.error(req.params.stockList);
    const data = await getStockBatch(req.params.stockList);
    buildResponse(res, data);
  });

  // app.get('/Portfol.io/Stock/:stock/:period', async (req, res) => {
  //   const data = await getStock(req.params.stock, req.params.period);
  //   buildResponse(res, data);
  // });

  app.get('/Portfol.io/Games/By/User/:uid', async (req, res) => {
    const data = await getGamesByUser(req.params.uid);
    buildResponse(res, data);
  });

  // app.get('/Portfol.io/Games/Stocks/:game_guid', async (req, res) => {
  //   const data = await getStock(req.params.game_guid);
  //   buildResponse(res, data);
  // });

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
