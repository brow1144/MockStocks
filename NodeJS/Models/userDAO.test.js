import {userModel} from '../utilities/MongooseModels';
import {getUser, createUser, joinGame, leaveGame} from './userDAO';

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
      stocks: []
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
