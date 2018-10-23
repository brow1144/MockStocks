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

const currentGame ={
  code: "36955",
  completed: false,
  end_time: "2018-12-26T02:49:09.372Z",
  game_name: "Spaff4New",
  leader_email: "r@r.com",
  start_time: "2018-12-13T02:49:09.372Z",
  starting_amount: 123456,
  trade_limit: 123
}

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

const updateGame = shallow(<UpdateGame currentGame={currentGame}/>);

describe('Bad Data Tests', () => {

  test('Bad Trade Limit', () => {
    updateGame.setState({
      trade_limit: -1
      }
    );
    updateGame.instance().update();
    expect(updateGame.state().err).toBe(true);
  })

  test('Bad Buying Power', () => {
    updateGame.setState({
        starting_amount: -1
      }
    );
    updateGame.instance().update();
    expect(updateGame.state().err).toBe(true);
  })

  test('Bad Name', () => {
    updateGame.setState({
        game_name: ""
      }
    );
    updateGame.instance().update();
    expect(updateGame.state().err).toBe(true);
  })
})