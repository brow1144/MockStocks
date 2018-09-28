import React from 'react';
import {shallow} from 'enzyme';
import CreateGame from './CreateGame';
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

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Positive Data Retreval', () => {
  test('Game creates with no errors', () => {
    const home = shallow(<CreateGame />);
    home.instance().showDataFromAPI(goodDayData);
    expect(home.state().visible).toBe(false);
  })
})