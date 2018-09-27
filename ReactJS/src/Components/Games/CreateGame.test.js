import React from 'react';
import {shallow} from 'enzyme';
import Home from './Home';
import axios from 'axios';

//STICK TEST DATA HERE

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});