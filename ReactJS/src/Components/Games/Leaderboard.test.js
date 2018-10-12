import React from 'react';
import {mount} from 'enzyme';
import Leaderboard from './Leaderboard';
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

describe('Checks that a correct amount of games are being made', () => {
  test('Check the size of the floor list', () => {
    const update = {
      updateGame: jest.fn(() => {console.error("updating")}),
    };
    const wrapper = mount(
      <Leaderboard myFloors={games} updateGame={update} />
    );
    expect(wrapper.find('tr').length).toBe(2);
  })
  /*
  test('Check the floor list can be clicked', () => {
    const update = {
      updateGame: jest.fn(() => {console.error("updating")}),
    };
    const wrapper = mount(
      <GameList myFloors={games} updateGame={update} />
    );
    wrapper.find('tr').simulate('change', {
      target: { value: 'hello' }
    })
    expect(wrapper.updateGame).toHaveBeenCalled();
  })*/
});