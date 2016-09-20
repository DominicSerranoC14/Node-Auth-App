'use strict';

const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
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
router.post('/login', (req, res, err) => {
  console.log("Test req.body", req.body);
});

router.post('/register', (req, res, err) => {
  console.log("Test req.body", req.body);
});
/////////////////////////////////////////

module.exports = router;
