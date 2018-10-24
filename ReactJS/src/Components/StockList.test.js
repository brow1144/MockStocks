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


const watchlist = [
  {changePercent: 0.00,
    close: 100.00,
    symbol: "TST"},
  {changePercent: 0.00,
    close: 100.00,
    symbol: "TST"},
  {changePercent: 0.00,
    close: 100.00,
    symbol: "TST"},
  {changePercent: 0.00,
    close: 100.00,
    symbol: "TST"},
];

describe('Positive Results', () => {

  test('Watchlist renders correct amount of stocks', () => {
    const stocklist = shallow(<StockList watchlist={watchlist}/>);
    const texts = stocklist.find('p').map(node => node.text());
    expect(texts.length/3).toBe(watchlist.length);
  })

})