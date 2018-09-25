import React from 'react';
import {shallow} from 'enzyme';
import NavBar from './NavBar';
import axios from 'axios';

const noResults = [{}];
const oneResult = [{ticker: 'AAPL', company: 'Apple'}];

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Positive Search Results', () => {

  // test('Search result has >= 6 results', () => {
  //   // TODO
  //   expect(true).toBe(true);
  // })

  // TODO 
  // test('Search result has < 6 results', () => {
    
  // })

  // TODO
  test('Search result has 0 results', () => {
    const navBar = shallow(<NavBar />);
    navBar.find('#search').simulate('change', {target: {value: 'CS408 is awesome'}});
    expect(navBar.state().tickersShowing.length).toBe(0);
  })

})
