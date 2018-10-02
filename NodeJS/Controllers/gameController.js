import bodyParser from 'body-parser';
import {parseError, buildResponse} from '../utilities/controllerFunctions';
import {createGame, updateGameSettings, addUserToGame, removeUserFromGame, getGamesByUser} from "../Models/gameDAO";
import {joinGame, leaveGame, buyStock} from '../Models/userDAO';

export default (app) => {
  // create a game
  app.post('/Portfol.io/Games', async (req, res) => {
    let game = {
      _id: req.body.code,
      code: req.body.code,
      game_name: req.body.game_name,
      leader_email: req.body.leader_email,
      starting_amount: req.body.starting_amount,
      trade_limit: req.body.trade_limit,
      start_time: req.body.start_time,
      end_time: req.body.end_time
    };

    let data;

    try {
      data = await createGame(game);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  app.put('/Portfol.io/Games/:gameCode', async (req, res) => {
    const gameSettings = {
      game_name: req.body.game_name,
      starting_amount: req.body.starting_amount,
      trade_limit: req.body.trade_limit,
      start_time: req.body.start_time,
      end_time: req.body.end_time
    }

    let data;

    try {
      data = await updateGameSettings(req.params.gameCode, gameSettings);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // join a game
  app.put('/Portfol.io/Games/:uid/:gameCode', async (req, res) => {
    let originalGame, user, data;

    try {
      originalGame = await addUserToGame(req.params.uid, req.params.gameCode);
      user = await joinGame(req.params.uid, req.params.gameCode, originalGame.starting_amount);
      data = {
        originalGame: originalGame,
        user: user
      };
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // leave a game
  app.put('/Portfol.io/Games/Leave/Game/:uid/:gameCode', async (req, res) => {
    let originalGame, user, data;

    try {
      originalGame = await removeUserFromGame(req.params.uid, req.params.gameCode);
      user = await leaveGame(req.params.uid, req.params.gameCode);
      data = {
        originalGame: originalGame,
        user: user
      };
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  app.get('/Portfol.io/Games/By/User/:uid', async (req, res) => {
    let data;

    try {
      data = await getGamesByUser(req.params.uid);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  app.put('/Portfol.io/Games/Buy/:uid/:gameCode/:stockName/:quantity/:totalQuantity', async (req, res) => {
    let data;

    try {
      data = await buyStock(req.params.uid, req.params.gameCode, req.params.stockName, req.params.quantity, req.params.totalQuantity);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });
};
