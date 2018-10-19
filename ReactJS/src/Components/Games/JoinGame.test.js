import React from 'react';
import {shallow} from 'enzyme';
import CreateGame from './CreateGame';
import axios from 'axios';

//STICK TEST DATA HERE
const validCode = 54862;
const invalidCodeShort = 1234;
const invalidCodeLong = 123456;


const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

const createGame = shallow(<CreateGame />);

describe('Positive Results', () => {
  test('Joins with no errors', () => {
    //call sum here
    createGame.instance().setState({code: validCode});
    createGame.instance().joinIt();
    expect(createGame.state().err).toBe(false);
  })

  test('Join game window opens on click', () => {
    createGame.instance().joining();
    expect(createGame.state().joinGame).toBe(true);
  })

  test('Join game window closes after submission', () => {
    createGame.instance().setState({code: validCode});
    createGame.instance().joinIt();
    createGame.instance().toggle();
    expect(createGame.state().joinGame).toBe(false);
  })

  //maybe one for value?
})