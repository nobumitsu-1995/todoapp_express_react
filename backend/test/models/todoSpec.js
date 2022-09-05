process.env.NODE_ENV = 'test';

const Todo = require('../../models/todo'),
{ expect } = require('chai');

require('../../main')

beforeEach( done => {
  Todo.remove({})
    .then(() => {
      done();
    })
})

describe('save Todo', () => {
  it('it should save one todo', (done) => {
    let testTodo = new Todo({
      content: "test"
    })

    testTodo.save()
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
  it('it should not save one todo', (done) => {
    let testTodo = new Todo({
      content: ""
    })

    testTodo.save()
      .catch(error => {
        expect(error).to.have.property('message')
        done()
      })
  })
});
