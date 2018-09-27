import bodyParser from 'body-parser';
import {createGame, addUserToGame} from "../Models/gameDAO";
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

    const data = await createGame(game);
    buildResponse(res, data);
  });

  // join a game
  app.put('/Portfol.io/Games/:uid/:gameCode', async (req, res) => {
    let user = await joinGame(req.params.uid, req.params.gameCode);
    let game = await addUserToGame(req.params.uid, req.params.gameCode);
    let data = {
      user: user,
      game: game
    }

    buildResponse(res, data);
  });
};

const buildResponse = (res, data) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  data && res.status(200).json(data);
};
