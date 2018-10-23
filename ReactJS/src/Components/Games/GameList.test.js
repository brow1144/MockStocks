import React from 'react';
import {mount} from 'enzyme';
import GameList from './GamesList';
import axios from 'axios';

const games = [{code: "345346", leader_email: "jeremyputput@gmail.com", game_name: "Best Game", starting_amount: 500,
  active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "vxDrsW9oirWK5Diss5hBJHV1WrC3", "vxDrsW9oirWK5Diss5hBJHV1WrC3"]},
  {code: "234234", leader_email: "r@yahoo.com", game_name: "Lame Game", starting_amount: 1000,
    active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "931QxmJBWbRAgx6sWaIV1J9b5Gd2"]}];

const noGame = [];

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
      <GameList myFloors={games} updateGame={update} />
    );
    expect(wrapper.find('tr').length).toBe(2);
  })

  test('Check the floor list has the correct names', () => {
    const update = {
      updateGame: jest.fn(() => {console.error("updating")}),
    };
    const wrapper = mount(
      <GameList myFloors={games} updateGame={update} />
    );
    const texts = wrapper.find('th').map(node => node.text());
    expect(texts[0] === 'Best Game').toBe(true);
    expect(texts[1] === 'Lame Game').toBe(true);
  })
  test('Check the floor list has no games given no data', () => {
    const update = {
      updateGame: jest.fn(() => {console.error("updating")}),
    };
    const wrapper = mount(
      <GameList myFloors={noGame} updateGame={update} />
    );
    const texts = wrapper.find('th').map(node => node.text());
    expect(texts.length === 0).toBe(true);
  })
});