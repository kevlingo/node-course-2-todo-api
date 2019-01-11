require('../server/config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
let { authenticate } = require('./middleware/authenticate/authenticate');

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo
    .save()
    .then(doc => res.send(doc))
    .catch(e => res.status(400).send(e));

  console.log(req.body);
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => res.send({ todos }))
    .catch(e => res.status(400).send(e));
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.send(todo);
    })
    .catch(e => res.status(400).send());
});

app.post('/users/', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user
    .generateAuthToken()
    .save()
    .then(user => res.header('x-auth', user.tokens[0].token).send(user))
    .catch(e => res.status(400).send(e));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app };
