import React from 'react';
import {shallow} from 'enzyme';
import Watchlist from './Watchlist';
import axios from 'axios';

const then = jest.fn(() => {
  return {catch: jest.fn()};
});

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

const full_watchlist = [
  {changePercent: 1.00, close: 100.00, symbol: "F"},
  {changePercent: 2.00, close: 100.00, symbol: "E"},
  {changePercent: 3.00, close: 100.00, symbol: "D"},
  {changePercent: 4.00, close: 100.00, symbol: "C"},
  {changePercent: 5.00, close: 100.00, symbol: "B"},
  {changePercent: 6.00, close: 100.00, symbol: "A"},
];

describe('Positive Results', () => {

  test('Watchlist displayed correctly', () => {
    const watchlist = shallow(<Watchlist />);
    watchlist.instance().setState({watchlist: full_watchlist, loaded: true});
    const rows = watchlist.find('tr');
    expect(rows.length-1).toBe(full_watchlist.length);
  });

  test('Stock removed from watchlist correctly', () => {
    const watchlist = shallow(<Watchlist />);
    watchlist.instance().setState({watchlist: full_watchlist, loaded: true});
    watchlist.instance().removeStock(3);
    const removeList = full_watchlist;
    removeList.splice(3, 1);
    expect(removeList).toEqual(watchlist.instance().state.watchlist);
  });

});