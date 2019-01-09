const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');

const { User } = require('../server/models/user');
const { Todo } = require('../server/models/todo');

// Deletes everything
// Todo.remove({}).then(result => console.log(result));

Todo.findByIdAndRemove('5c36146ce1b545188cd08963').then(result => {
  console.log(result);
});
