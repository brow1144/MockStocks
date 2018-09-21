import bodyParser from 'body-parser';
import {getUser, addUser, getActiveGames} from '../Models/userDAO';

let urlencodedParser = bodyParser.urlencoded({extended: false});

export default (app) => {
  app.post('/Portfol.io/CreateAccount/:user', async (req, res) => {
    const data = await addUser(user);
    buildResponse(res, data);
  });

  app.get('/Portfol.io/getuser/:email', async (req, res) => {
    const data = await getUser(req.params.email);
    buildResponse(res, data);
  });

  app.get('/Portfol.io/getActiveGames/:email', async (req, res) => {
    const data = await getActiveGames(req.params.email);
    buildResponse(res, data);
  });
};

const buildResponse = (res, data) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  data && res.status(200).json(data);
};
