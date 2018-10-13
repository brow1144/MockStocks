import express from 'express';
import bodyParser from 'body-parser';

import stockController from './controllers/stockController';
import userController from './controllers/userController';
import gameController from './controllers/gameController';
import {runSchedules} from './controllers/scheduler';

// connect to the database
import db from './config/db';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.options('/*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendStatus(200);
});

// run controllers
stockController(app);
userController(app);
gameController(app);

// run schedules to automate tasks
runSchedules();

// listen to port
app.listen(8080, () => {
  console.log("Now listening on port 8080.");
});
