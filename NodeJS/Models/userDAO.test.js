import {userModel} from '../utilities/MongooseModels';
import {
  getUser,
  createUser,
  joinGame,
  leaveGame,
  updateUserBuyingPower,
  buyStock,
  sellStock,
  removeStock,
  getUserGame,
  updateValueHistory,
  getValueHistory,
  clearValueHistory,
  getUserWatchlist,
  insertToUserWatchlist, removeFromUserWatchlist
} from './userDAO';
import * as stockDAO from './stockDAO';

userModel.findOne = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

userModel.create = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

userModel.findOneAndUpdate = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

describe('User Tests Positive Case', function () {
  it('should call find with the proper find clause', async function () {
    await getUser('XFKSHFD3578132958IUDF');
    expect(userModel.findOne).toHaveBeenCalledWith({_id: 'XFKSHFD3578132958IUDF'});
  });

  it('should call create with the proper user object', async function () {
    const user = {
      _id: 'XFKSHFD3578132958IUDF',
      username: 'john1234',
      email: 'testemail@gmail.com'
    };

    await createUser(user);
    expect(userModel.create).toHaveBeenCalledWith(user);
  });

  it('should call findOneAndUpdate with the proper game object', async function () {
    const game = {
      code: '2352364',
      buying_power: 1000,
      trade_count: 0,
      stocks: [],
      value_history: []
    };

    const updateClause = {
      'game.code': {'$ne': game.code},
      '$addToSet': {'active_games': game}
    };

    const options = {
      new: true,
      passRawResult: true
    };

    await joinGame('XFKSHFD3578132958IUDF', '2352364', 1000);
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
      {_id: 'XFKSHFD3578132958IUDF'},
      updateClause,
      options
    );
  });

  it('should call findOneAndUpdate with the proper game object', async function () {
    const options = {
      new: true,
      passRawResult: true
    };

    await leaveGame('XFKSHFD3578132958IUDF', '2352364', 1000);
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
      {_id: 'XFKSHFD3578132958IUDF'},
      {'$pull': {'active_games': {'code': '2352364'}}},
      options
    );
  });

  it('should call findOneAndUpdate with the proper game settings', async function () {
    const findClause = {
      '_id': '325FXYDF351235JLDSKG',
      'active_games.code': '523535'
    };

    const options = {
      new: true,
      passRawResult: true
    };

    await updateUserBuyingPower('325FXYDF351235JLDSKG', '523535', 3000);
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
      findClause,
      {'$set': {'active_games.$.buying_power': 3000}},
      options
    );
  });

  it('should call findOneAndUpdate with the proper settings', async function () {
    const stock = {
      name: 'AAPL',
      quantity: 25
    };

    const findClause = {
      '_id': '325FXYDF351235JLDSKG',
      'active_games.code': '523535'
    };

    const options = {
      new: true,
      passRawResult: true
    };

    await removeStock('325FXYDF351235JLDSKG', '523535', 'AAPL', 25);
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
      findClause,
      {'$pull': {'active_games.$.stocks': stock}},
      options
    );
  });

  it('should call findOneAndUpdate with the proper settings', async function () {
    const valueEntry = {
      value: 4500,
      time: 10000000000
    };

    const findClause = {
      '_id': '325FXYDF351235JLDSKG',
      'active_games.code': '523535'
    };

    const options = {
      new: true,
      passRawResult: true
    };

    await updateValueHistory('325FXYDF351235JLDSKG', '523535', 4500, 10000000000);
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
      findClause,
      {'$push': {'active_games.$.value_history': valueEntry}},
      options
    );
  });
});

describe('Tests for watchlist', function () {

  let returnData;
  beforeAll(async () => {
    userModel.findOne = jest.fn(() => {
      return Promise.resolve({watchlist: ['MSFT', 'AAPL']})
    });

    userModel.findOneAndUpdate = jest.fn(() => {
      return {
        then: jest.fn(() => {
          return {catch: jest.fn()}
        })
      }
    });
    jest.mock('./stockDAO');
    stockDAO.getStockBatch = jest.fn(() => {
      return {
        stock: {
          quote: {
            symbol: 'MSFT',
            close: 22,
            changePercent: 45.01
          }
        }
      }
    });


    returnData = await getUserWatchlist('22');
  });

  it('should call findOne with the right information', function () {
    expect(userModel.findOne).toHaveBeenCalledWith({_id: '22'});
  });

  it('should call findOneAndUpdate with the right information', function () {
    insertToUserWatchlist('22', {stock: 13});
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith({_id: '22'}, {$push: {watchlist: {stock: 13}}});
  });

  it('should call findOneAndUpdate with the right information', function () {
    removeFromUserWatchlist('22', {stock: 13});
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith({_id: '22'}, {$pull: {watchlist: {stock: 13}}});
  });

  it('should call getStockBatch with a string of symbols', function () {
    expect(stockDAO.getStockBatch).toHaveBeenCalledWith('MSFT,AAPL');
  });
});

describe('User Tests Negative Cases', function () {
  it('should call create with an empty parameter', async function () {
    const user = {
      _id: 'XFKSHFD3578132958IUDF',
      username: '',
      email: 'testemail@gmail.com'
    };

    await expect(createUser(user)).rejects.toEqual('UserError: Each field must have information');
  });

  it('should call create with an undefined parameter', async function () {
    const user = {
      _id: 'XFKSHFD3578132958IUDF',
      username: undefined,
      email: 'testemail@gmail.com'
    };

    await expect(createUser(user)).rejects.toEqual('UserError: One or more fields are missing');
  });
});
