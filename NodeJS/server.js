import express from 'express';
import controller from './controllers/controller';
// connect to the database
import db from './config/db';

const app = express();

// run controllers
controller(app);

// listen to port
app.listen(8080, () => {
  console.log("Now listening on port 8080.");
});
