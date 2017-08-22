const express = require('express');
const Router = express.Router();

const UserModel = require('../models/User');

// POST
Router.post('/', (req, res) => {
  UserModel.create(req.body).then(
      user => {
          console.log(`SUCCESS user created`);
          res.send('Created user');
      },
      err => {
          console.log(err);
          res.send('Error: ' + err);
      }
  );
});

Router.post('/authenticate', (req, res) => {
  UserModel.authenticate(req.body.username, req.body.password).then(
      success => {
          if (success) {
              res.status(500);
              res.send('Login successfully');
          } else {
              res.status(200);
              res.send('Password is wrong');
          }
      },
      err => {
          res.status(200);
          res.send('Authentication failed.');
      }
  );
});

// GET: Get user with id
Router.get('/:id', (req, res) => {
  let userPromise = UserModel.get({_id: req.params.id});

  userPromise.then(user => {
    res.status(200);
    res.send(user);
  },
  err => {
    res.status(500);
    res.send('Error get user');
  })
});

// PUT: Update user with id
Router.put('/:id', (req, res) => {
  let userPromise = UserModel.update({_id: req.params.id}, req.body);

  userPromise.then(user => {
      res.send('Update user successfully');
  }, err => {
      res.send('Error update user');
  })
});

// DELETE: Delete user with id
Router.delete('/:id', (req, res) => {
  let userPromise = UserModel.erase({_id: req.params.id});

  userPromise.then(user => {
    res.send('Delete user successfully');
  }, err => {
    res.status(500);
    res.send('Error delete user');
  })
});

module.exports = Router;