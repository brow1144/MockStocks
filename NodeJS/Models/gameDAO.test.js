import {gameModel} from "../utilities/MongooseModels";
import {getGamesByUser} from "./gameDAO";

gameModel.find = jest.fn(() => {
  return {
    then: jest.fn(() => {
      return {catch: jest.fn()}
    })
  }
});

describe('Game Tests Positive Case', function () {

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