import React from 'react';
import {shallow} from 'enzyme';
import NavBar from './NavBar';
import axios from 'axios';

const tickers = [{symbol: 'AAPL', company: 'Apple Inc.'}, {symbol: 'BCEI', company: 'Bonzana Creek Energy'}, {symbol: 'GOOGL', company: 'Alphabet'},
                 {symbol: 'ACER', company: 'ACER Theraputics'}, {symbol: 'CEI', company: 'Camber Energy'}, {symbol: '', company: ''},
                 {symbol: 'ACES', company: 'ALPS Clean Energy'}, {symbol: 'ACET', company: 'Aceto Corporation'}, {symbol: 'CEIX', company: 'CONSOL Energy'},
                 {symbol: 'BCE', company: 'BCE Inc'}, {symbol: 'CCE', company: 'Coke European Partners'}]
              
const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Positive Search Results', () => {

  test('Search result has >= 6 results', () => {
    const navBar = shallow(<NavBar />);
    navBar.setState({tickers: tickers})
    navBar.find('#search').simulate('change', {target: {value: 'C'}});
    expect(navBar.state().tickersShowing.length).toBe(6)  
  })

  test('Search result has < 6 results', () => {
    const navBar = shallow(<NavBar />);
    navBar.setState({tickers: tickers})
    navBar.find('#search').simulate('change', {target: {value: 'CEI'}});
    expect(navBar.state().tickersShowing.length).toBe(3)
  })

  test('Search result has 0 results', () => {
    const navBar = shallow(<NavBar />);
    navBar.setState({tickers: tickers})
    navBar.find('#search').simulate('change', {target: {value: 'CS408 is awesome'}});
    expect(navBar.state().tickersShowing.length).toBe(0);
  })

})
