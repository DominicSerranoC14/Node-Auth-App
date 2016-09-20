'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const routes = require('./routes/');
const { connect } = require('./db/database');

const port = process.env.PORT || 3000;
/////////////////////////////////////////

/////////////////////////////////////////
//Middlewares
//Set the view engine to pug
app.set('port', port);
app.set('view engine', 'pug');
/////////////////////////////////////////


/////////////////////////////////////////
//Middlewares
//Session Middle-ware
app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'authiscool'
}));

app.use((req, res, next) => {
  app.locals.email = req.session.email;
  next();
});

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
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  })
  .catch(console.error);
/////////////////////////////////////////
