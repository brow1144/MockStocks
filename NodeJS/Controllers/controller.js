import bodyParser from 'body-parser';
import {getStock, getStockBatch, getStockIntraday, getTickers, loadTickers} from '../Models/stockDAO';
import {getGamesByUser} from "../Models/gameDAO";
import {getUsers, addUser} from '../Models/userDAO';

//let urlencodedParser = bodyParser.urlencoded({extended: false});

export default (app) => {

  app.options('/*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(200);
  });

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
    let data, dateLimit;
    dateLimit = new Date();
    switch (req.params.period) {
      case 'Day':
        data = await getStockIntraday(req.params.stock);
        break;
      case 'Week':
        dateLimit.setDate(dateLimit.getDate() - 7);
        data = await getStock(req.params.stock, "Daily", dateLimit);
        break;
      case 'Month':
        dateLimit.setMonth(dateLimit.getMonth() - 1);
        console.error(dateLimit);
        data = await getStock(req.params.stock, "Daily", dateLimit);
        break;
      case 'TriMonth':
        dateLimit.setMonth(dateLimit.getMonth() - 3);
        console.error(dateLimit);
        data = await getStock(req.params.stock, "Daily", dateLimit);
        break;
      case 'Year':
        dateLimit.setFullYear(dateLimit.getFullYear() - 1);
        console.error(dateLimit);
        data = await getStock(req.params.stock, "Monthly", dateLimit);
        break;
      default: // 'All'
        data = await getStock(req.params.stock, "Monthly", 0);

    }
    //const data = await getStock(req.params.stock, req.params.period);
    buildResponse(res, data);
  });

  // stockList is in the format of comma separated tickers
  app.get('/Portfol.io/Batch/Stock/:stockList', async (req, res) => {
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  data && res.status(200).json(data);
};
