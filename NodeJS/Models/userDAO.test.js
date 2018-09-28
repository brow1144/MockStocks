import {userModel} from '../utilities/MongooseModels';
import {getUser, createUser, joinGame} from './userDAO';

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

describe('User tests positive case', function () {
  it('should call find with the proper find clause', async function () {
    await getUser('XFKSHFD3578132958IUDF');
    expect(userModel.findOne).toHaveBeenCalledWith({_id: 'XFKSHFD3578132958IUDF'});
  });

  it('should call create with the proper object', async function () {
    const user = {
      _id: 'XFKSHFD3578132958IUDF',
      username: 'john1234',
      email: 'testemail@gmail.com'
    };

    await createUser(user);
    expect(userModel.create).toHaveBeenCalledWith(user);
  });

  it('should', async function () {
    const game = {
      code: '2352364',
      stocks: []
    };

    await joinGame('XFKSHFD3578132958IUDF', '2352364');
    expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
      {_id: 'XFKSHFD3578132958IUDF'},
      {$push: {active_games: game}},
      {new: true}
    );
  });
});

describe('User tests negative cases', function () {
  // it('should call find with the proper find clause', async function () {
  //   await getUser('XFKSHFD3578132958IUDF');
  //   expect(userModel.findOne).toHaveBeenCalledWith({_id: 'XFKSHFD3578132958IUDF'});
  // });

  it('should call create with the proper object', async function () {
    const user = {
      _id: 'XFKSHFD3578132958IUDF',
      username: undefined,
      email: 'testemail@gmail.com'
    };

    //let data = await createUser(user);
    expect(createUser(user)).toBe('UserError: One or more fields are missing');
    //expect(userModel.create).toHaveBeenCalledWith(user);
  });

  // it('should', async function () {
  //   const game = {
  //     code: '2352364',
  //     stocks: []
  //   };
  //
  //   await joinGame('XFKSHFD3578132958IUDF', '2352364');
  //   expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
  //     {_id: 'XFKSHFD3578132958IUDF'},
  //     {$push: {active_games: game}},
  //     {new: true}
  //   );
  // });
});
