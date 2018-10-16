import {gameModel} from '../utilities/MongooseModels';
import {getGamesByUser, createGame, addUserToGame, removeUserFromGame,
  updateGameSettings, getGame, getAllGames} from './gameDAO';

gameModel.find = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

gameModel.create = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

gameModel.findOneAndUpdate = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

describe('Game Tests Positive Case', function () {
  it('should call create with the proper game object', async function () {
    const game = {
      code: '325FST53',
      game_name: 'Test Game',
      leader_email: 'testemail@gmail.com',
      starting_amount: 54133,
      trade_limit: 25,
      start_time: new Date('2018-05-18T16:00:00Z'),
      end_time: new Date('2018-07-18T16:00:00Z')
    };

    await createGame(game);
    expect(gameModel.create).toHaveBeenCalledWith(game);
  });

  it('should call findOneAndUpdate with the proper game settings', async function () {
    const gameSettings = {
      game_name: 'Test Game',
      starting_amount: 54133,
      trade_limit: 25,
      start_time: new Date('2018-05-18T16:00:00Z'),
      end_time: new Date('2018-07-18T16:00:00Z')
    }

    const options = {
      new: true,
      passRawResult: true
    };

    await updateGameSettings('325FST53', gameSettings);
    expect(gameModel.findOneAndUpdate).toHaveBeenCalledWith(
      {code: '325FST53'},
      gameSettings,
      options
    );
  });

  it('should call findOneAndUpdate with the proper input', async function () {
    await addUserToGame('XFKSHFD3578132958IUDF', '2352364');
    expect(gameModel.findOneAndUpdate).toHaveBeenCalledWith(
      {code: '2352364'},
      {'$addToSet': {'active_players': 'XFKSHFD3578132958IUDF'}},
      {passRawResult: true}
    );
  });

  it('should call findOneAndUpdate with the proper input', async function () {
    await removeUserFromGame('XFKSHFD3578132958IUDF', '2352364');
    expect(gameModel.findOneAndUpdate).toHaveBeenCalledWith(
      {code: '2352364'},
      {'$pull': {'active_players': 'XFKSHFD3578132958IUDF'}},
      {passRawResult: true}
    );
  });

  it('should call find with the proper find clause', async function () {
    await getGamesByUser('Rawley123');
    expect(gameModel.find).toHaveBeenCalledWith({active_players: 'Rawley123'});
  });

  it('should call find with the proper find clause', async function () {
    await getGame('23523');
    expect(gameModel.find).toHaveBeenCalledWith({'code': '23523'});
  });

  it('should call find with the proper find clause', async function () {
    await getAllGames();
    expect(gameModel.find).toHaveBeenCalledWith({});
  });
});

describe('Game Tests Negative Cases', function () {
  it('should call create with an empty parameter', async function () {
    const game = {
      code: '325FST53',
      game_name: 'Test Game',
      leader_email: '',
      starting_amount: 54133,
      trade_limit: 25,
      start_time: new Date('2018-05-18T16:00:00Z'),
      end_time: new Date('2018-07-18T16:00:00Z')
    };

    await expect(createGame(game)).rejects.toEqual('UserError: Each field must have information');
  });

  it('should call create with an undefined parameter', async function () {
    const game = {
      code: '325FST53',
      game_name: 'Test Game',
      leader_email: 'testemail@gmail.com',
      starting_amount: undefined,
      trade_limit: 25,
      start_time: new Date('2018-05-18T16:00:00Z'),
      end_time: new Date('2018-07-18T16:00:00Z')
    };

    await expect(createGame(game)).rejects.toEqual('UserError: One or more fields are missing');
  });

  it('should call create with an empty parameter', async function () {
    const game = {
      code: '325FST53',
      game_name: 'Test Game',
      leader_email: '',
      starting_amount: 54133,
      trade_limit: 25,
      start_time: new Date('2018-05-18T16:00:00Z'),
      end_time: new Date('2018-07-18T16:00:00Z')
    };

    await expect(updateGameSettings('325FST53', game)).rejects.toEqual('UserError: Each field must have information');
  });

  it('should call create with an undefined parameter', async function () {
    const game = {
      code: '325FST53',
      game_name: 'Test Game',
      leader_email: 'testemail@gmail.com',
      starting_amount: undefined,
      trade_limit: 25,
      start_time: new Date('2018-05-18T16:00:00Z'),
      end_time: new Date('2018-07-18T16:00:00Z')
    };

    await expect(updateGameSettings('325FST53', game)).rejects.toEqual('UserError: One or more fields are missing');
  });
});
