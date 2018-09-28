import React from 'react';
import {shallow} from 'enzyme';
import CreateGame from './CreateGame';
import axios from 'axios';

//STICK TEST DATA HERE
const validCode = 12345;

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Positive Data Retreval', () => {
  test('Joins game with no errors', () => {
    const joinGame = shallow(<CreateGame />);
    joinGame.instance().showDataFromAPI(goodGame);
    expect(joinGame.state().visible).toBe(false);
  })
})