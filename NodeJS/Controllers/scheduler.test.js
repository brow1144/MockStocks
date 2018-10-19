import {userModel} from '../utilities/MongooseModels';
import {getAllUsers} from '../Models/userDAO';
import {getPortfolioValues, clearCounters} from './scheduler';

userModel.find = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

userModel.findOneAndUpdate = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

getAllUsers = jest.fn(() => {
  // const users = [
  //   'jmkoontz',
  //   'putput'
  // ];

  return ['jmkoontz', 'putput'];
});

it('should have tests', function () {
  expect(true).toEqual(false);
});

describe('Positive scheduler tests', function () {
  it('should calculate portfolio values for each user', async function () {
    let users = await getPortfolioValues();
    console.log(users);
    expect(getAllUsers).toHaveBeenCalledWith();
  });
});
