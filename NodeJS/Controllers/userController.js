import bodyParser from 'body-parser';
import {getUser, addUser} from '../Models/userDAO';

export default (app) => {
  app.post('/Portfol.io/CreateAccount', async (req, res) => {
    let user = {
      _id: req.body._id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    };

    const data = await addUser(user);
    buildResponse(res, data);
  });

  app.get('/Portfol.io/getuser/:email', async (req, res) => {
    const data = await getUser(req.params.email);
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
