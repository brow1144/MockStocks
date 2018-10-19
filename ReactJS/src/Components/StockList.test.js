import React from 'react';
import {mount} from 'enzyme';
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

const stocklist = mount(<StockList watchlist={watchlist}/>);
const texts = stocklist.find('p').map(node => node.text());
console.log(texts)


describe('Positive Results', () => {
  test('Watchlist renders correct amount of stocks', () => {
    expect(texts.length/3).toBe(watchlist.length);
  })
})