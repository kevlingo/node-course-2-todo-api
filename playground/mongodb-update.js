const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  {
    useNewUrlParser: true
  },
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server.');
    }

    let db = client.db('TodoApp');
    // db.collection("Todos")
    //   .findOneAndUpdate(
    //     { _id: new ObjectID("5c324dda3c462015423dfd95") },
    //     {
    //       $set: { completed: true }
    //     },
    //     { returnOriginal: false }
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });

    db.collection('Users')
      .findOneAndUpdate(
        { _id: new ObjectID('5c324f1c3c462015423dfe39') },
        { $set: { name: 'Kevin' }, $inc: { age: 1 } },
        { returnOriginal: false }
      )
      .then(res => {
        console.log(res);
      });

    console.log('Connected to MongoDB server.');

    // client.close();
  }
);
