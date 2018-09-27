import bodyParser from 'body-parser';
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
      data = {
        error: parseError(err)
      };
    }

    buildResponse(res, data);
  });

  // get a user
  app.get('/Portfol.io/:uid', async (req, res) => {
    let data;

    try {
      data = await getUser(req.params.uid);
    } catch (err) {
      data = {
        error: parseError(err)
      };
    }

    buildResponse(res, data);
  });
};

const parseError = (err) => {
  let error = {
    status: 0,
    message: ''
  };

  if (typeof err === String && err.includes('UserError:')) {
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
