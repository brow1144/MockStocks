import {userModel} from '../utilities/MongooseModels';
import {getPortfolioValues, clearCounters, checkActiveGames} from './scheduler';
import * as gameDAO from "../Models/gameDAO";
import * as userDAO from "../Models/userDAO";

jest.mock('../Models/gameDAO');
jest.mock('../Models/userDAO');

// userModel.find = jest.fn(() => {
//   return {
//     then: jest.fn(() => {
//       return {catch: jest.fn()}
//     })
//   }
// });

userModel.findOneAndUpdate = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

// getAllUsers = jest.fn(() => {
//   // const users = [
//   //   'jmkoontz',
//   //   'putput'
//   // ];
//
//   return ['jmkoontz', 'putput'];
// });

userModel.find = jest.fn(() => {
  // let obj = [
  //   'df',
  //   'dsf'
  // ]
  // let test = {
  //   name: 'asdf',
  //   type: 'water'
  // }
  // let obj2 = [
  //   {name: 'asdf', type: 'water'}
  // ]
  return Promise.resolve(
    [{uid: 'jmkoontz'},
      {uid: 'putput'}]
  );
});

describe('Positive scheduler tests', function () {
  it('should calculate portfolio values for each user', async function () {
    let users = await getPortfolioValues();
    console.log(users);
    expect().toHaveBeenCalledWith();
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
