let express = require('express');
let bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');

let app = express();
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

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

module.exports = { app };