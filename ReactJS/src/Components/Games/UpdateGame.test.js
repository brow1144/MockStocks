import React from 'react';
import {shallow} from 'enzyme';
import UpdateGame from './UpdateGame';
import axios from 'axios';

//STICK TEST DATA HERE
const goodGame = {
  code: 12345,
  game_name: "Test Name",
  leader_email: "test@email.com",
  starting_amount: 1000,
  trade_limit: 100,
  start_time: "2018-09-30 22:09:00.000",
  end_time: "2018-11-11 03:34:00.000"
}

const badName = {
  code: 12345,
  game_name: "",
  leader_email: "test@email.com",
  starting_amount: 1000,
  trade_limit: 100,
  start_time: "2018-09-30 22:09:00.000",
  end_time: "2018-11-11 03:34:00.000"
}

const badEmail = {
  code: 12345,
  game_name: "Test Name",
  leader_email: "testemail.com",
  starting_amount: 1000,
  trade_limit: 100,
  start_time: "2018-09-30 22:09:00.000",
  end_time: "2018-11-11 03:34:00.000"
}

const badStartingAmount = {
  code: 12345,
  game_name: "Test Name",
  leader_email: "test@email.com",
  starting_amount: 0,
  trade_limit: 100,
  start_time: "2018-09-30 22:09:00.000",
  end_time: "2018-11-11 03:34:00.000"
}

const badTradeLimit = {
  code: 12345,
  game_name: "Test Name",
  leader_email: "test@email.com",
  starting_amount: 1000,
  trade_limit: -1,
  start_time: "2018-09-30 22:09:00.000",
  end_time: "2018-11-11 03:34:00.000"
}

const badDates = {
  code: 12345,
  game_name: "Test Name",
  leader_email: "test@email.com",
  starting_amount: 1000,
  trade_limit: 100,
  start_time: null,
  end_time: null
}

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Positive Data Retreval', () => {
  test('Game creates with no errors', () => {
    const updateGame = shallow(<UpdateGame />);
    updateGame.instance().showDataFromAPI(goodGame);
    expect(createGame.state().visible).toBe(false);
  })
})