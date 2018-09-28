import {gameModel} from "../utilities/MongooseModels";
import {getGamesByUser, createGame, addUserToGame} from "./gameDAO";

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
  // To Jake - Assume that mongoose functions work, there is no need for us to check that as it is assumed that
  // a third party library should do its job so long as we give it what is correct.

  // technically it is best for us to have a beforeAll clause that does our function call first and we
  // run multiple tests on the single call, however there isn't mich going on in this call
  // I think eventually we will do some tests that run against mockData but for now just checking calls works.
  it('should call find with the proper find clause', async function () {
    await getGamesByUser('Rawley123');
    expect(gameModel.find).toHaveBeenCalledWith({active_players: 'Rawley123'});
    // This seems pointless but it will check against if we screw something up in code by mistake, in general
    // having more specific clauses and building more data will cause this to be a bigger and more significant test.
    // Also integration testing will be full API tests from controller though so that will be more instense.
  });// but this will mock out the database call, theres more I'd like to test with this but I gotta work on other stuff rn

});
