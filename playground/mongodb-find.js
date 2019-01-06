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

  // db.collection('Todos').find({
  //   _id: new ObjectID('5c3239c03c462015423df5d7')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos.', err);
  // });
  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos');
  //   // console.log(JSON.stringify(docs, undefined, 2));
  //   console.log(`Count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos.', err);
  // });
  db.collection('Users').find({
      name: 'Kevin'
    }).toArray()
    .then((doc) => {
      console.log('Users');
      console.log(JSON.stringify(doc, undefined, 2));
    })
    .catch((err) => {
      console.log('Unable to fetch todos.', err);
    });
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


  // client.close();
});