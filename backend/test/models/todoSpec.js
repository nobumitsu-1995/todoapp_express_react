process.env.NODE_ENV = 'test';

const Todo = require('../../models/todo'),
{ expect } = require('chai'),
User = require('../../models/user');

require( '../../main' );

beforeEach( done => {
  Todo.remove({})
    .then(() => {
      done();
    })
})

describe('save Todo', () => {
  it('it should save one todo', (done) => {
    User.create({
      name: "sample",
      email: "sample@email.com",
      password: "password"
    })
    .then(user => {
      Todo.create({
        content: "test",
        userId: user._id
      })
      .then(() => {
        Todo.find({})
          .then( result => {
            expect(result.length).to.eq(1)
            expect(result[0]).to.have.property('_id')
            expect(result[0]).to.have.property('content')
            expect(result[0]).to.have.property('createdAt')
            expect(result[0].content).to.eq("test")
            done()
          } )
      })
    })
  })

  it('it should not save one todo', (done) => {
    User.create({
      name: "sample",
      email: "sample@email.com",
      password: "password"
    })
    .then(user => {
      Todo.create({
        content: "",
        userId: user._id
      })
      .catch(error => {
        expect(error).to.have.property('message')
        done()
      })
    })
  })

  it('it should not save one todo without userId', (done) => {
    Todo.create({
      content: "",
    })
    .catch(error => {
      expect(error).to.have.property('message')
      done()
    })
  })
});
