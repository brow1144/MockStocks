import React from 'react';
import {shallow} from 'enzyme';
import Games from '../../Pages/Games';
import GameList from './GamesList';
import axios from 'axios';

const games = [{code: "345346", leader_email: "jeremyputput@gmail.com", game_name: "Best Game", starting_amount: 500,
  active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "vxDrsW9oirWK5Diss5hBJHV1WrC3", "vxDrsW9oirWK5Diss5hBJHV1WrC3"]},
  {code: "234234", leader_email: "r@yahoo.com", game_name: "Lame Game", starting_amount: 1000,
    active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "931QxmJBWbRAgx6sWaIV1J9b5Gd2"]}];

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


//const gameList = shallow(<GameList />);

describe('Checks that clicking a floor name has the correct key', () => {
  test('Click the first item in the games list', () => {
    const props = {
      myFloors: games,
      updateGame: jest.fn(),
      trackEvent: jest.fn(),
    };
    const gameList = shallow(<GameList {...props}/>);
    //gameList.setState({currentGame: games[0], email: "jeremyputput@gmail.com"});
    gameList.find("#0").simulate('click');
    gameList.instance().updateFloor(games);
    expect(gameList.updateFloor).toHaveBeenCalledWith(1);
  })
  /*test('Click the first item in the games list', () => {
    game.setState({currentGame: games[0], email: "papajohn@gmail.com"});
    game.instance().leaderCheck();
    expect(game.state().leader).toBe(false);
  })*/
})