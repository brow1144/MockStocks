import React from 'react';
import {shallow} from 'enzyme';
import Games from './Games';
import axios from 'axios';

// Test the size of the Floor list
// Test size of the players in each leaderboard
// Check the floor name displays
// Check the code displays for leaders only
const users = [{}];
const games = [{code: "345346", leader_email: "jeremyputput@gmail.com", game_name: "Best Game", starting_amount: 500,
              active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "vxDrsW9oirWK5Diss5hBJHV1WrC3", "vxDrsW9oirWK5Diss5hBJHV1WrC3"]},
              {code: "234234", leader_email: "r@yahoo.com", game_name: "Lame Game", starting_amount: 1000,
                active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "931QxmJBWbRAgx6sWaIV1J9b5Gd2"]}];
const resp = {games: games, users: users};

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

global.sessionStorage = {
  getItem: jest.fn(() => {console.error("getting")}),
  setItem: jest.fn(() => {console.error("setting")})
};

describe('Checks that the leader email displays properly', () => {
  test('Current user is the leader', () => {
    const game = shallow(<Games />);
    game.setState({currentGame: games[0], email: "jeremyputput@gmail.com"});
    game.instance().leaderCheck();
    expect(game.state().leader).toBe(true);
  })
  test('Current user is the not the leader', () => {
    const game = shallow(<Games />);
    game.setState({currentGame: games[0], email: "papajohn@gmail.com"});
    game.instance().leaderCheck();
    expect(game.state().leader).toBe(false);
  })
})
