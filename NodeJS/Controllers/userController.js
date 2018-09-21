import bodyParser from 'body-parser';
import {getUser, createUser} from '../Models/userDAO';

export default (app) => {
  app.post('/Portfol.io/CreateAccount', async (req, res) => {
    let user = {
      _id: req.body._id,
      username: req.body.username,
      email: req.body.email
    };

    const data = await createUser(user);
    buildResponse(res, data);
  });

  app.get('/Portfol.io/:uid', async (req, res) => {
    const data = await getUser(req.params.uid);
    buildResponse(res, data);
  });

  // app.get('/Portfol.io/getActiveGames/:email', async (req, res) => {
  //   const data = await getActiveGames(req.params.email);
  //   buildResponse(res, data);
  // });
};

const buildResponse = (res, data) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  data && res.status(200).json(data);
};
