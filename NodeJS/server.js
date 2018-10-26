import express from 'express';
import bodyParser from 'body-parser';

import stockController from './Controllers/stockController';
import userController from './Controllers/userController';
import gameController from './Controllers/gameController';
import {runSchedules} from './Controllers/scheduler';

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
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Now listening on port 8080.");
});
