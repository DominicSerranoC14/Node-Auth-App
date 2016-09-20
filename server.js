'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const routes = require('./routes/');
const { connect } = require('./db/database');
/////////////////////////////////////////

/////////////////////////////////////////
//Middlewares
//Set the view engine to pug
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
/////////////////////////////////////////


/////////////////////////////////////////
// Routes
//Use the routes moudule
app.use(routes);
/////////////////////////////////////////


/////////////////////////////////////////
//Server listening on port 3000
connect()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Express server listening on port 3000`);
    });
  })
  .catch(console.error);
/////////////////////////////////////////
