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

const stocklist = shallow(<StockList watchlist={watchlist}/>);

describe('Positive Results', () => {
  test('Watchlist renders correct amount of stocks', () => {
    //call sum here
    createGame.instance().createIt();

    expect(stocklist.state().length).toBe(false);
  })
})