import React from 'react';
import {shallow} from 'enzyme';
import Games from './Games';
import axios from 'axios';

// Test the size of the Floor list
// Test size of the players in each leaderboard
// Check the floor name displays
// Check the code displays for leaders only
const games = [{code: "345346", leader_email: "jeremyputput@gmail.com", game_name: "Best Game", starting_amount: 500,
              active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "vxDrsW9oirWK5Diss5hBJHV1WrC3", "vxDrsW9oirWK5Diss5hBJHV1WrC3"]},
              {code: "234234", leader_email: "r@yahoo.com", game_name: "Lame Game", starting_amount: 1000,
                active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "931QxmJBWbRAgx6sWaIV1J9b5Gd2"]}];
const myFloors = [{}];
const currentGame = {};
const resp = {games: games};
const sessionStorage = {uid: "kObyyRI68of2Prc0RkjnJfN6Joc2",
    getItem : function(param) {
      return this.uid;
    }
  };

const then = jest.fn(() => {
  return {data: resp, catch: jest.fn()};
})
console.log(then.data.games);

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Checks games are fetched', () => {
  test('Current user`s games display without a problem', () => {
    const game = shallow(<Games />);
    game.instance().fetchUsers();
    expect(game.state().myFloors.length).toBe(2);
  })
})
/*
describe('Checks users are displayed', () => {
  test('Current game`s users are being found', () => {
    const game = shallow(<Games />);
    game
    game.instance().fetchUsers();
    expect(game.state().myFloors.length).toBe(2);
  })
})*/