import bodyParser from 'body-parser';
import {parseError, buildResponse} from '../utilities/controllerFunctions';
import {getUser, createUser, getUserGame, getUserWatchlist, insertToUserWatchlist} from '../Models/userDAO';

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

  // get a user's watchlist
  app.get('/Portfol.io/Watchlist/:uid', async (req, res) => {
    let data;
    try {
      data = await getUserWatchlist(req.params.uid);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });

  // insert to a user's watchlist
  app.post('/Portfol.io/Watchlist/:uid/:stockSymbol', async (req, res) => {
    let data;
    try {
      data = await insertToUserWatchlist(req.params.uid, req.params.stockSymbol);
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

  // get a particular game for a user
  app.get('/Portfol.io/:uid/:gameCode', async (req, res) => {
    let data;

    try {
      data = await getUserGame(req.params.uid, req.params.gameCode);
    } catch (err) {
      data = {error: parseError(err)};
    }

    buildResponse(res, data);
  });
};
