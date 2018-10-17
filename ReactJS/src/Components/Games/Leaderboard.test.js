import React from 'react';
import {mount} from 'enzyme';
import Leaderboard from './Leaderboard';
import axios from 'axios';

const games = [{stocks: [], code: "345346", leader_email: "jeremyputput@gmail.com", game_name: "Best Game", starting_amount: 500,
  active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "vxDrsW9oirWK5Diss5hBJHV1WrC3", "vxDrsW9oirWK5Diss5hBJHV1WrC3"]},
  {stocks: [], code: "234234", leader_email: "r@yahoo.com", game_name: "Lame Game", starting_amount: 1000,
    active_players: ["kObyyRI68of2Prc0RkjnJfN6Joc2", "931QxmJBWbRAgx6sWaIV1J9b5Gd2"]}];

const userGame = [{buying_power: 5234,
code: "59901",
stocks: [],
stocksArray: [],
totalAssets: 11868.349999999999,
totalOwned: 183,
trade_count: 4,
uid: "JGh7kXSEfITvkbZBcvrTkh4Ka0v2",
username: "jerbear"},
  {buying_power: 1804,
code: "59901",
stocks: [],
stocksArray: [],
totalAssets: 9290.14,
totalOwned: 36,
trade_count: 54,
uid: "yyam7tjgc5c6mM6k4QLlnADJVN12",
username: "jmkoontz",}];

const badGame = [];
const ans = (['Rank', 'Username', 'Total Assets', 'Trades Left', '1', 'jerbear', '$11,868.35', '96 / 100', '2', 'jmkoontz', '$9,290.14', '46 / 100']);
// One set of data points
const goodDayData = [{"x":1537882860000,"y":114.63},{"x":1537882920000,"y":114.52},{"x":1537882980000,"y":114.55},{"x":1537883040000,"y":114.58},{"x":1537883100000,"y":114.57},{"x":1537883160000,"y":114.52},{"x":1537883220000,"y":114.63},{"x":1537883280000,"y":114.56},{"x":1537883340000,"y":114.54},{"x":1537883400000,"y":114.71},{"x":1537883460000,"y":114.63},{"x":1537883520000,"y":114.67},{"x":1537883580000,"y":114.58},{"x":1537883640000,"y":114.54},{"x":1537883700000,"y":114.655},{"x":1537883760000,"y":114.61},{"x":1537883820000,"y":114.66},{"x":1537883880000,"y":114.62},{"x":1537883940000,"y":114.75},{"x":1537884000000,"y":114.735},{"x":1537884060000,"y":114.86},{"x":1537884120000,"y":114.82},{"x":1537884180000,"y":114.8},{"x":1537884240000,"y":114.79},{"x":1537884300000,"y":114.8},{"x":1537884360000,"y":114.8015},{"x":1537884420000,"y":114.64},{"x":1537884480000,"y":114.55},{"x":1537884540000,"y":114.54},{"x":1537884600000,"y":114.5907},{"x":1537884660000,"y":114.5325},{"x":1537884720000,"y":114.5925},{"x":1537884780000,"y":114.555},{"x":1537884840000,"y":114.62},{"x":1537884900000,"y":114.62},{"x":1537884960000,"y":114.71},{"x":1537885020000,"y":114.7},{"x":1537885080000,"y":114.66},{"x":1537885140000,"y":114.7},{"x":1537885200000,"y":114.62},{"x":1537885260000,"y":114.52},{"x":1537885320000,"y":114.525},{"x":1537885380000,"y":114.51},{"x":1537885440000,"y":114.52},{"x":1537885500000,"y":114.43},{"x":1537885560000,"y":114.47},{"x":1537885620000,"y":114.429},{"x":1537885680000,"y":114.39},{"x":1537885740000,"y":114.375},{"x":1537885800000,"y":114.37},{"x":1537885860000,"y":114.395},{"x":1537885920000,"y":114.4},{"x":1537885980000,"y":114.38},{"x":1537886040000,"y":114.42},{"x":1537886100000,"y":114.44},{"x":1537886160000,"y":114.42},{"x":1537886220000,"y":114.45},{"x":1537886280000,"y":114.43},{"x":1537886340000,"y":114.45},{"x":1537886400000,"y":114.47},{"x":1537886460000,"y":114.47},{"x":1537886520000,"y":114.48},{"x":1537886580000,"y":114.44},{"x":1537886640000,"y":114.38},{"x":1537886700000,"y":114.384},{"x":1537886760000,"y":114.38},{"x":1537886820000,"y":114.11},{"x":1537886880000,"y":114.105},{"x":1537886940000,"y":114.0632},{"x":1537887000000,"y":113.95},{"x":1537887060000,"y":114},{"x":1537887120000,"y":114.03},{"x":1537887180000,"y":113.98},{"x":1537887240000,"y":114.04},{"x":1537887300000,"y":114.02},{"x":1537887360000,"y":114.0599},{"x":1537887420000,"y":114.01},{"x":1537887480000,"y":113.86},{"x":1537887540000,"y":113.81},{"x":1537887600000,"y":113.93},{"x":1537887660000,"y":113.8899},{"x":1537887720000,"y":113.83},{"x":1537887780000,"y":113.951},{"x":1537887840000,"y":113.955},{"x":1537887900000,"y":113.99},{"x":1537887960000,"y":114},{"x":1537888020000,"y":114.0099},{"x":1537888080000,"y":114},{"x":1537888140000,"y":114.02},{"x":1537888200000,"y":114.01},{"x":1537888260000,"y":114.04},{"x":1537888320000,"y":114.09},{"x":1537888380000,"y":114.12},{"x":1537888440000,"y":114.13},{"x":1537888500000,"y":114.17},{"x":1537888560000,"y":114.18},{"x":1537888620000,"y":114.155},{"x":1537888680000,"y":114.15},{"x":1537888740000,"y":114.14},{"x":1537888800000,"y":114.14}];
// Zero Data
const zeroData = [{}];
// Only 3 data points
const smallData = [{"x":1537882860000,"y":114.63},{"x":1537882920000,"y":114.52},{"x":1537882980000,"y":114.55}];

const then = jest.fn(() => {
  return {catch: jest.fn()};
})

axios.get = jest.fn((url) => {
  return {then: then, catch: jest.fn()};
});

describe('Checks that leaderboard displays users` data correct', () => {
  const update = {
    updateGame: jest.fn(() => {console.error("updating")}),
    showGraph: jest.fn(() => {console.error("displaying graph")}),
  };
  const currentGame = {
    trade_limit: 100,
  };
  const wrapper = mount(
    <Leaderboard userGame={userGame} currentGame={currentGame} updateGame={update} />
  );
  const texts = wrapper.find('th').map(node => node.text());

  test('Check the correct amount of users are being made', () => {
    expect(wrapper.find('tr').length).toBe(3);
  })
  test('Check the leaderboard shows the correct total assets', () => {
    expect(texts[6] === ans[6]).toBe(true);
    expect(texts[10] === ans[10]).toBe(true);
  })
  test('Check the leaderboard shows the correct usernames', () => {
    expect(texts[5] === ans[5]).toBe(true);
    expect(texts[9] === ans[9]).toBe(true);
  })
  test('Check the leaderboard shows the numebr of trades remaining', () => {
    expect(texts[7] === ans[7]).toBe(true);
    expect(texts[11] === ans[11]).toBe(true);
  })
  test('Check the leaderboard shows nothing when there are no users', () => {
    const wrapper = mount(
      <Leaderboard userGame={badGame} currentGame={currentGame} updateGame={update} />
    );
    const texts = wrapper.find('th').map(node => node.text());
    expect(texts.length).toBe(0);
  })
});

describe('Checks the history graph display`s data correctly', () => {
  const update = {
    updateGame: jest.fn(() => {console.error("updating")}),
    showGraph: jest.fn(() => {console.error("displaying graph")}),
  };
  const currentGame = {
    trade_limit: 100,
  };
  const wrapper = mount(
    <Leaderboard userGame={userGame} currentGame={currentGame} updateGame={update} />
  );

  test('Check the modal is displayed when graph data is set', () => {
    wrapper.instance().showDataFromAPI(goodDayData, 'jerbear');
    expect(wrapper.state().open).toBe(true);
  })
  test('Check the graph is not displayed when graph data is empty', () => {
    wrapper.instance().showDataFromAPI(zeroData, '');
    expect(wrapper.state().visibleData).toBe(true);
  })
  test('Check the graph is not displayed when graph data is too small', () => {
    wrapper.instance().showDataFromAPI(smallData, 'jerbear');
    expect(wrapper.state().visibleData).toBe(true);
  })
  test('Check the users` name is displayed given a username', () => {
    wrapper.instance().showDataFromAPI(smallData, 'jerbear');
    expect(wrapper.state().name).toBe("jerbear");
  })
  test('Check the users` current total assets is displayed given data', () => {
    wrapper.instance().showDataFromAPI(goodDayData, 'jerbear');
    expect(wrapper.state().currentPriceFor).toBe("114.14");
  })
});



