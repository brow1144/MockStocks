import {getPortfolioValues, clearCounters, checkActiveGames} from './scheduler';
import * as gameDAO from "../Models/gameDAO";
import * as userDAO from "../Models/userDAO";
import * as stockDAO from "../Models/stockDAO";

// jest.mock('../Models/gameDAO');
// jest.mock('../Models/userDAO');

describe('Positive scheduler tests', function () {
  const gameObj = {
    code: 123,
    active_players: [{
      name: 'germy'
    }],
    completed: false,
    end_time: new Date('2018-09-19 12:00:43.799')
  };

  const userListObj = {
    [{uid: 'jmkoontz'},
      {uid: 'putput'}]
  };

  beforeAll(async () => {
    userDAO.getAllUsers = jest.fn(() => {
      return Promise.resolve([userListObj]);
    });
    stockDAO.getStockBatch = jest.fn();
    userDAO.updateValueHistory = jest.fn();
    getPortfolioValues();
  });

  it('should call getStockBatch properly', function () {
    expect(userDAO.makeGameInactive).toHaveBeenCalledWith()
  });

  it('should call updateValueHistory properly', function () {
    expect(gameDAO.completeGame).toHaveBeenCalledWith()
  });

  it('should calculate portfolio values for each user', async function () {
    // let users = await getPortfolioValues();
    // console.log(users);
    // expect().toHaveBeenCalledWith();
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
