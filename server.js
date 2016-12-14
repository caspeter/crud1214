'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knex = require('./knex');

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/users', function(req, res, next){
  knex('users')
  .then((result) =>{
    var users = (result);
    res.send(users);
  })
  .catch((err) => {
    next(err);
  });
});

app.post('/users', function(req, res, next){
  var user = (req.body);
  knex('users')
  .insert(user, '*')
  .then((result) =>{
    console.log(result);
    res.send(result[0]);
  })
  .catch((err) => {
    next(err);
  });
});

app.patch('/users/:id', function(req, res, next){
  var user = (req.body);
  knex('users')
  .update(user, '*')
  .where('id', req.params.id)
  .then((result) => {
    res.send((result[0]));
  })
  .catch((err) => {
    next(err);
  });

});

app.delete('/users/:id', function(req, res, next){
  knex('users')
  .del()
  .where('id', req.params.id)
  .returning('*')
  .then((result) =>{
    res.send(result[0]);
  })
  .catch((err) => {
    next(err);
  });
});


app.listen(port, ()=>{
  console.log('listening on port ', port);
});
