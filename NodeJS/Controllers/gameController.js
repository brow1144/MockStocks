import bodyParser from 'body-parser';
import {createGame} from "../Models/gameDAO";

export default (app) => {
  app.post('/Portfol.io/Games', async (req, res) => {
    console.log(req.body);
    let game = {
      code: req.body.code,
      name: req.body.name,
      leader_email: req.body.leader_email,
      starting_amount: req.body.starting_amount,
      trade_limit: req.body.trade_limit,
      start_time: req.body.start_time,
      end_time: req.body.end_time
    };

    const data = await createGame(game);
    buildResponse(res, data);
  });

  // app.get('/Portfol.io/getActiveGames/:email', async (req, res) => {
  //   const data = await getActiveGames(req.params.email);
  //   buildResponse(res, data);
  // });
};

const buildResponse = (res, data) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  data && res.status(200).json(data);
};
