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

  // db.collection('Todos').deleteMany({
  //     text: 'eat lunch'
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  // db.collection('Todos').deleteOne({
  //     text: 'eat lunch'
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  // db.collection('Todos').findOneAndDelete({
  //     completed: true
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });

  db.collection('Users').deleteMany({
      name: 'Kevin'
    })
    .then((res) => {
      console.log(res);
    });

  db.collection('Users').findOneAndDelete({
      _id: new ObjectID('5c32355f670f790fe06b8861')
    })
    .then((res) => {
      console.log(res);
    })

  console.log('Connected to MongoDB server.')


  // client.close();
});