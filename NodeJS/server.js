let express = require('express');

let controller = require('./controllers/controller');

let app = express();

// connect to the database


// run controllers
controller(app);

// listen to port
app.listen(3000, () => {
  console.log("Now listening on port 3000.");
});
