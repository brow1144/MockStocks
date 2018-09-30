import bodyParser from 'body-parser';
import {parseError, buildResponse} from '../utilities/controllerFunctions';
import {getUser, createUser} from '../Models/userDAO';

export default (app) => {
  app.post('/Portfol.io/CreateAccount', async (req, res) => {
    let user = {
      _id: req.body._id,
      username: req.body.username,
      email: req.body.email
    };

    let data;

    try {
      data = await createUser(user);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // get a user
  app.get('/Portfol.io/:uid', async (req, res) => {
    let data;

    try {
      data = await getUser(req.params.uid);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });
};
