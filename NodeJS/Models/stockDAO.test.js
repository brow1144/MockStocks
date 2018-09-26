import axios from 'axios';
import {getStock, getStockIntraday, getStockBatch, getTickers} from './stockDAO';

axios.get = jest.fn(() => {
  return {then: jest.fn(()=> {
    return {catch: jest.fn()}
    })}
});

const monthCall = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&apikey=WIOGAHD0RJEEZ59V';
const allCall = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=MSFT&apikey=WIOGAHD0RJEEZ59V';
const dateNow =  '2018-09-26T22:04:23.109Z';

describe('Positive Stock Calls', function () {
  let dateLimit;
  beforeAll(() => {
    dateLimit = new Date(dateNow);
  });

  it('should call the API with the proper URL - MONTH/TriMonth', async function () {
    await getStock('MSFT', 'Daily', dateLimit);
    expect(axios.get).toHaveBeenCalledWith(monthCall);
  });

  it('should call the API with the proper URL - ALL/Year', async function () {
    await getStock('MSFT', 'Monthly',9);
    expect(axios.get).toHaveBeenCalledWith(allCall);
  });

  it('should format the data returned by the API call into x/y coordinates', async function () {
    let data;
    //await data = getStock('MSFT', 'Monthly');
  });

  it('should only have data that is more recent than date limit', function () {

  });
});