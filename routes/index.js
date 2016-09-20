'use strict';

const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const User = require('../models/user')
/////////////////////////////////////////


/////////////////////////////////////////
//GET routes
router.get('/', (req, res, err) => {
  res.render('index')
});

router.get('/login', (req, res, err) => {
  res.render('login')
});

router.get('/register', (req, res, err) => {
  res.render('register')
});
/////////////////////////////////////////


/////////////////////////////////////////
//POST routes
router.post('/register', ({body: {email, password, confirm}}, res, err) => {
  //If the user has entered correct info
  if ( password === confirm ) {
    //Then has the users password
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 15, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      })
    })
    .then((hash) => {
      //Then post the new user with the hashed password to the db
      User.create({ email, password: hash})
      .then(() => {
        res.render('register', {msg: 'Successful registration, you can log in now!'});
      });
    });
  } else {
    res.render('register', {msg: 'Something went wrong with registering.'});
  }
});//End POST register route


//Login POST route
router.post('/login', ({session, body: {email, password}}, res, err) => {

  User.findOne({email})
  .then((user) => {

    if (user) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, matches) => {
          if (err) {
            reject(err);
          } else {
            resolve(matches);
          }
        })
      })
    } else {
      res.render('/login', {msg: 'No user exists with email / password combo.'});
    }

  })
  .then(matches => {

    if (matches) {
      session.email = email;
      res.redirect('/');
    } else {
      res.render('login', {msg: 'Error logging in, please register if you do not have an account.'});
    }

  });

});//End login POST route


//POST Route for logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/login');
  });
});
/////////////////////////////////////////


/////////////////////////////////////////
//Middle ware guard
//Middle-ware which prohibits users to access the below routes
router.use((req, res, next) => {
  if(req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
});
/////////////////////////////////////////


/////////////////////////////////////////
//GET logout route
router.get('/logout', (req, res, err) => {
  res.render('logout');
});
/////////////////////////////////////////


module.exports = router;
