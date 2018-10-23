import mongoose from 'mongoose';
import {getPortfolioValues, clearCounters, checkActiveGames} from './scheduler';
import {userModel, tickerModel} from '../utilities/MongooseModels';
import * as gameDAO from "../Models/gameDAO";
import * as userDAO from "../Models/userDAO";
import * as stockDAO from "../Models/stockDAO";

describe('getPortfolioValues Tests', function () {
  let user1 = {
    _id: '3525AFDSFSFD32',
    active_games: [
      {
        code: '12532',
        buying_power: 1000,
        stocks: [
          {
            name: 'AAPL',
            quantity: 20
          },
          {
            name: 'GOOG',
            quantity: 10
          }
        ]
      }
    ]
  };

  const userListObj = [
    userModel.hydrate(user1)
  ];

  const stockBatch = [
    {
      quote: {
        symbol: 'AAPL',
        latestPrice: 1000
      }
    },
    {
      quote: {
        symbol: 'GOOG',
        latestPrice: 300
      }
    }
  ];

  beforeAll(async () => {
    userDAO.getAllUsers = jest.fn(() => {
      return Promise.resolve(userListObj);
    });

    stockDAO.getStockBatch = jest.fn(() => {
      return Promise.resolve(stockBatch);
    });

    userDAO.updateValueHistory = jest.fn();
    await getPortfolioValues();
  });

  it('should call getStockBatch properly', function () {
    expect(stockDAO.getStockBatch).toHaveBeenCalledWith('AAPL, GOOG');
  });

  it('should call updateValueHistory properly', function () {
    expect(userDAO.updateValueHistory).toHaveBeenCalledWith(
      '3525AFDSFSFD32',
      '12532',
      24000,
      expect.any(Number)
    );
  });
});

describe('clearCounters Tests', function () {
  let tickers = {
    tickers: [
      {
        symbol: 'AAPL',
        dailyBuyCount: 5,
        weeklyBuyCount: 15
      },
      {
        symbol: 'GOOG',
        dailyBuyCount: 2,
        weeklyBuyCount: 40
      }
    ]
  };

  const options = {
    new: true,
    passRawResult: true
  };

  beforeAll(async () => {
    stockDAO.getTickers = jest.fn(() => {
      return Promise.resolve(tickerModel.hydrate(tickers));
    });

    tickerModel.findOneAndUpdate = jest.fn(() => {
      return {
        then: jest.fn(() => {
          return {catch: jest.fn()}
        })
      }
    });
  });

  it('should call getTickers properly', async function () {
    await clearCounters(true);
    expect(stockDAO.getTickers).toHaveBeenCalledWith();
  });

  it('should call findOneAndUpdate properly for daily', async function () {
    await clearCounters(true);
    expect(tickerModel.findOneAndUpdate).toHaveBeenCalledWith(
      {'tickers.symbol': tickers.tickers[0].symbol},
      {'$set': {'tickers.$.dailyBuyCount': 0}},
      options
    );
  });

  it('should call findOneAndUpdate properly for weekly', async function () {
    await clearCounters(true);
    expect(tickerModel.findOneAndUpdate).toHaveBeenCalledWith(
      {'tickers.symbol': tickers.tickers[0].symbol},
      {'$set': {'tickers.$.dailyBuyCount': 0}},
      options
    );
  });
});

describe('checkActiveGames Tests', function () {
  const gameObj = {
    code: 123,
    active_players: [{
      name: 'germy'
    }],
    completed: false,
    end_time: new Date('2018-09-19 12:00:43.799')
  };

  beforeAll(async () => {
    gameDAO.getAllGames = jest.fn(() => {
      return Promise.resolve([gameObj]);
    });
    gameDAO.completeGame = jest.fn();
    userDAO.makeGameInactive = jest.fn();
    checkActiveGames();
  });

  it('should call makeGameInactive properly', function () {
    expect(userDAO.makeGameInactive).toHaveBeenCalledWith({name: 'germy'},gameObj)
  });

  it('should call completeGame properly', function () {
    expect(gameDAO.completeGame).toHaveBeenCalledWith(123)
  });
});
