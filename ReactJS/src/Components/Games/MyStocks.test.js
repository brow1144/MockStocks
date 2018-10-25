import React from 'react';
import {mount, shallow} from 'enzyme';
import MyStocks from './MyStocks';
import axios from 'axios';

const games = [{stocks: [], code: "345346", leader_email: "jeremyputput@gmail.com", game_name: "Best Game", starting_amount: 500,
  active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "vxDrsW9oirWK5Diss5hBJHV1WrC3", "vxDrsW9oirWK5Diss5hBJHV1WrC3"]},
  {stocks: [], code: "234234", leader_email: "r@yahoo.com", game_name: "Lame Game", starting_amount: 1000,
    active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "931QxmJBWbRAgx6sWaIV1J9b5Gd2"]}];

const curUserStocks = {buying_power: 5234,
  code: "59901",
  stocks: [{name: "SSL", quantity: 5}, {name: "DWPP", quantity: 12}, {name: "JKJ", quantity: 2}, {name: "DJD", quantity: 164}],
  stocksArray: [{price: 37, quantity: 5, symbol: "SSL", total: 185}, {price: 29.139, quantity: 12, symbol: "DWPP", total: 349.668},
  {price: 171.253, quantity: 2, symbol: "JKJ", total: 342.506}, {price: 35.247, quantity: 164, symbol: "DJD", total: 5780.508}],
  totalAssets: 11891.682,
  totalOwned: 183,
  trade_count: 4,
  uid: "JGh7kXSEfITvkbZBcvrTkh4Ka0v2",
  username: "jerbear"};

const noStocks = {buying_power: 5234,
  code: "59901",
  stocks: [{name: "SSL", quantity: 5}, {name: "DWPP", quantity: 12}, {name: "JKJ", quantity: 2}, {name: "DJD", quantity: 164}],
  stocksArray: [],
  totalAssets: 11891.682,
  totalOwned: 183,
  trade_count: 4,
  uid: "JGh7kXSEfITvkbZBcvrTkh4Ka0v2",
  username: "jerbear"};

describe('Checks that My Stocks displays users` data correct', () => {
  let wrapper = shallow(
    <MyStocks currentUserStocks={curUserStocks} />
  );

  test('The correct amount of stocks are being displayed', () => {
    expect(wrapper.find('tr').length).toBe(6);
  })

});
describe('Checks that MyStocks displays handles no stocks correctly', () => {
  let wrapper = mount(
    <MyStocks currentUserStocks={noStocks} />
  );

  test('Check the table doesn`t display', () => {
    expect(wrapper.find('tr').length).toBe(2);
  });
});

