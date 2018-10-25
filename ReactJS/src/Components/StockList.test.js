import React from 'react';
import {shallow} from 'enzyme';
import StockList from './StockList';
import axios from 'axios';

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});


const full_watchlist = [
  {changePercent: 1.00, close: 100.00, symbol: "TST"},
  {changePercent: 2.00, close: 100.00, symbol: "TST"},
  {changePercent: 3.00, close: 100.00, symbol: "TST"},
  {changePercent: 4.00, close: 100.00, symbol: "TST"},
  {changePercent: 5.00, close: 100.00, symbol: "TST"},
  {changePercent: 6.00, close: 100.00, symbol: "TST"},
];

const correctRisers = [
  {changePercent: 6.00, close: 100.00, symbol: "TST"},
  {changePercent: 5.00, close: 100.00, symbol: "TST"},
  {changePercent: 4.00, close: 100.00, symbol: "TST"},
  {changePercent: 3.00, close: 100.00, symbol: "TST"},
  {changePercent: 2.00, close: 100.00, symbol: "TST"},
];

const empty_watchlist = [];

describe('Positive Results', () => {

  test('Watchlist returns correct number of top risers', () => {
    const stocklist = shallow(<StockList watchlist={full_watchlist}/>);
    const topRisers = stocklist.instance().getTopRisers();
    expect(topRisers.length).toBe(5);
  });

  test('Watchlist correctly displays top risers', () => {
    const stocklist = shallow(<StockList watchlist={full_watchlist}/>);
    const divs = stocklist.find('hr');
    expect(divs.length).toBe(5);
  });

  test('Watchlist displays top risers in correct order of change percent', () => {
    const stocklist = shallow(<StockList watchlist={full_watchlist}/>);
    const topRisers = stocklist.instance().getTopRisers();
    expect(topRisers).toEqual(correctRisers);
  });

});