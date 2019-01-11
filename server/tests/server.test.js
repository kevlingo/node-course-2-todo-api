const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');
const { todos, users, populateTodos, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', done => {
    let text = 'Test todo test';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => expect(res.body.text).toBe(text))
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create todo with invalid data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(err => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => expect(res.body.todos.length).toBe(2))
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => expect(res.body.todo.text).toBe(todos[0].text))
      .end(done);
  });

  it('should return 404 if todo not found', done => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if the ID is not valid', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    let id = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(id)
          .then(todo => expect(todo).toNotExist())
          .catch(e => done(e));
      });
    done();
  });

  it(`should return a 404 if the todo isn't found`, done => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is not valid', done => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    let id = todos[0]._id.toHexString();

    request(app)
      .patch(`/todos/${id}`)
      .send({ text: 'test', completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe('test');
        expect(res.body.completed).toBe(true);
        expect(res.body.completedAt).toBeA('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', done => {
    let id = todos[1]._id.toHexString();

    request(app)
      .patch(`/todos/${id}`)
      .send({ text: 'test', completed: false })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe('test');
        expect(res.body.completed).toBe(false);
        expect(res.body.completedAt).toBeNull;
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return a user if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => expect(res.body).toEqual({}))
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', done => {
    let email = 'test@test.com';
    let password = 'abc1233';

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.header['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toExist();
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({ email }).then(user => {
          expect(user).toExist();
          expect(user.password).toNotEqual(password);
          done();
        });
      });
  });

  it('should return validation errors if request is invalid', done => {
    request(app)
      .post('/users')
      .send({ email: 'lkjsdf', password: 'abc' })
      .expect(400)
      .end(done);
  });

  it('should not create user if the email is already in use', done => {
    request(app)
      .post('/users')
      .send({ email: 'kevin@example.com', password: 'abc123543' })
      .expect(400)
      .end(done);
  });
});
