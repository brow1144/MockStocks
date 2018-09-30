import bodyParser from 'body-parser';
import {createGame, updateGameSettings, addUserToGame} from "../Models/gameDAO";
import {joinGame} from '../Models/userDAO';

export default (app) => {
  // create a game
  app.post('/Portfol.io/Games', async (req, res) => {
    let game = {
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
    let game, user, data;

    try {
      game = await addUserToGame(req.params.uid, req.params.gameCode);
      user = await joinGame(req.params.uid, req.params.gameCode);
      data = {
        game: game,
        user: user
      };
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });
};

const parseError = (err) => {
  let error = {
    status: 0,
    message: ''
  };

  if (typeof err === 'string' && err.includes('UserError:')) {
    error.status = 400;
    error.message = err.substring('UserError:'.length + 1);
  } else {
    error.status = 500;
    error.message = err;
  }

  return error;
}

const buildResponse = (res, data) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (data.error)
    res.status(data.error.status).json(data);
  else
    res.status(200).json(data);
};
