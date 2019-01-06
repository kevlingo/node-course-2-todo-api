const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server.');
  }

  let db = client.db('TodoApp');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, results) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(results.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Joe',
  //   age: 43,
  //   location: 'Indiana'
  // }, (err, results) => {
  //   if (err) {
  //     return console.log('Unable to insert user.', err);
  //   }

  //   console.log(results.ops[0]._id.getTimestamp());

  // });

  console.log('Connected to MongoDB server.')


  client.close();
});