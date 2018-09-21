import express from 'express';
import bodyParser from 'body-parser';

import controller from './controllers/controller';
import userController from './controllers/userController';
import gameController from './controllers/gameController';

// connect to the database
import db from './config/db';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.options('/*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendStatus(200);
});

// run controllers
controller(app);
userController(app);
gameController(app);

// listen to port
app.listen(8080, () => {
  console.log("Now listening on port 8080.");
});
