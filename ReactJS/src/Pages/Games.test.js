import React from 'react';
import {shallow} from 'enzyme';
import Games from './Games';
import axios from 'axios';

// Test the size of the Floor list
// Test size of the players in each leaderboard
// Check the floor name displays
// Check the code displays for leaders only
const myfloors = [{}];

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Correctly Display Games', () => {
  test('Current user`s games display without a problem', () => {
    const game = shallow(<Games />);
    game.instance().showDataFromAPI(goodDayData);
    expect(game.state().myFloors.length).toBe(2);
  })
})