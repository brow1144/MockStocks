import bodyParser from 'body-parser';
import {parseError, buildResponse} from '../utilities/controllerFunctions';
import {getStock, getStockBatch, getStockIntraday, getTickers, loadTickers, getTicker, getTrendingStocks} from '../Models/stockDAO';

export default (app) => {
  // Period is in the format : 'Monthly', 'Weekly', 'Daily', etc. Casing is important here.
  app.get('/Portfol.io/Stock/:stock/:period', async (req, res) => {
    let data, dateLimit;
    dateLimit = new Date();

    try {
      switch (req.params.period) {
        case 'Day':
          data = await getStockIntraday(req.params.stock);
          break;
        case 'Month':
          dateLimit.setMonth(dateLimit.getMonth() - 1);
          console.error(dateLimit);
          data = await getStock(req.params.stock, "1m", dateLimit);
          break;
        case 'TriMonth':
          dateLimit.setMonth(dateLimit.getMonth() - 3);
          console.error(dateLimit);
          data = await getStock(req.params.stock, "3m", dateLimit);
          break;
        case 'Year':
          dateLimit.setFullYear(dateLimit.getFullYear() - 1);
          console.error(dateLimit);
          data = await getStock(req.params.stock, "1y", dateLimit);
          break;
        default: // 'All'
          data = await getStock(req.params.stock, "5y", 0);
      }
    } catch (err) {
      data = {error: parseError(err)};
    }

    //const data = await getStock(req.params.stock, req.params.period);
    buildResponse(res, data);
  });

  // stockList is in the format of comma separated tickers
  app.get('/Portfol.io/Batch/Stock/:stockList', async (req, res) => {
    let data;

    try {
      data = await getStockBatch(req.params.stockList);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // app.get('/Portfol.io/Stock/:stock/:period', async (req, res) => {
  //   const data = await getStock(req.params.stock, req.params.period);
  //   buildResponse(res, data);
  // });

  // app.get('/Portfol.io/Games/Stocks/:game_guid', async (req, res) => {
  //   const data = await getStock(req.params.game_guid);
  //   buildResponse(res, data);
  // });

  // WARNING : only call this if the database of tickers is down. It is a very large file to save into mongo and is better that it is untouched for now
  app.get('/Portfol.io/LoadTickers', async (req, res) => {
    let data;

    try {
      data = await loadTickers();
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  app.get('/Portfol.io/GetTickers', async (req, res) => {
    let data;

    try {
      data = await getTickers();
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  app.get('/Portfol.io/Trending/:period', async (req, res) => {
    let data;

    try {
      data = await getTrendingStocks(req.params.period);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });
};
