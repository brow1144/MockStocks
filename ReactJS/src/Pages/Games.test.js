import React from 'react';
import {shallow} from 'enzyme';
import Games from './Games';
import axios from 'axios';

const games = [{code: "345346", leader_email: "jeremyputput@gmail.com", game_name: "Best Game", starting_amount: 500,
              active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "vxDrsW9oirWK5Diss5hBJHV1WrC3", "vxDrsW9oirWK5Diss5hBJHV1WrC3"]},
              {code: "234234", leader_email: "r@yahoo.com", game_name: "Lame Game", starting_amount: 1000,
                active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "931QxmJBWbRAgx6sWaIV1J9b5Gd2"]}];

const userList = [{_id: "kObyyRI68of2Prc0RkjnJfN6Joc2", active_games: games, username: "jdog", email: "jeremyputput@gmail.com"},
                  {_id: "931QxmJBWbRAgx6sWaIV1J9b5Gd2", active_games: games, username: "jlion", email: "j@gmail.com"}];

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

const game = shallow(<Games />);

describe('Checks that the leader email displays properly', () => {
  test('Current user is the leader', () => {
    game.setState({currentGame: games[0], email: "jeremyputput@gmail.com"});
    game.instance().leaderCheck();
    expect(game.state().leader).toBe(true);
  })
  test('Current user is the not the leader', () => {
    game.setState({currentGame: games[0], email: "papajohn@gmail.com"});
    game.instance().leaderCheck();
    expect(game.state().leader).toBe(false);
  })
})

describe('Checks that the games page sets up on load', () => {
  test('List of current floors updates', () => {
    game.setState({email: "jeremyputput@gmail.com"});
    game.instance().setGameData(games);
    expect(game.state().myFloors).toBe(games);
  })
  test('Current game is set to the first of the games', () => {
    game.setState({email: "papajohn@gmail.com"});
    game.instance().setGameData(games);
    expect(game.state().currentGame).toBe(games[0]);
  })
})

describe('Checks that users are correctly stored after being retrieved', () => {
  test('Add a user to the users array', () => {
    game.setState({users: userList});
    game.instance().processUser(userList[0], 2);
    expect(game.state().users[2]).toBe(userList[0]);
  })
  test('The current user`s email gets set', () => {
    game.setState({users: userList, uid: "kObyyRI68of2Prc0RkjnJfN6Joc2"});
    game.instance().processUser(userList[0], 2);
    expect(game.state().email).toBe(userList[0].email);
  })
  test('The current user`s email should no be set', () => {
    game.setState({email: "", users: userList, uid: "kObyyRI68of2Prc0RkjnJfN6Joc2"});
    game.instance().processUser(userList[1], 2);
    expect(game.state().email).toBe("");
  })
})