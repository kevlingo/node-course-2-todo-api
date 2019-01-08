const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');

const { User } = require('../server/models/user');
const { Todo } = require('../server/models/todo');

// let id = '5c350a14020aae3b189c7a22111';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({ _id: id }).then(todos => console.log('Todos', todos));

// Todo.findOne({ _id: id }).then(todo => console.log('Todo', todo));

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('Id not found');
//     }

//     console.log('Todo by Id', todo);
//   })
//   .catch(e => console.log(e));

let id = '5c326b9b8dc4fd1f8cc580fc';

User.findById(id)
  .then(user => {
    if (!user) {
      return console.log('User not found');
    }
    console.log('User', user);
  })
  .catch(e => console.log(e));
