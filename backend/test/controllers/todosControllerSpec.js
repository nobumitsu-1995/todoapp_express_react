process.env.NODE_ENV = 'test';

const chai = require('chai'),
{ expect } = chai,
Todo = require('../../models/todo'),
todosController = require('../../controllers/todosController'),
app = require('../../main'),
chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

beforeEach( done => {
  Todo.remove({})
    .then(() => {
      done();
    })
})

describe('todosController', () => {
  describe('/todos GET', () => {
    it('it should GET all todos', done => {
      let testTodo = new Todo({
        content: "test"
      })
  
      testTodo.save().then(() => {
        chai.request(app).get('/todos').end((errors, res) => {
          expect(res).to.be.status(200)
          expect(res.body.data.length).to.eq(1)
          expect(errors).to.be.null
          done()
        })
      })
    })
  })

  describe('/todos/:id GET', () => {
    it('it should GET todo by ID', done => {
      let testTodo = new Todo({
        content: "test"
      })
  
      testTodo.save().then(todo => {
        let todoId = todo._id;
  
        chai.request(app).get(`/todos/${todoId}`).end((errors, res) => {
          expect(res).to.be.status(200)
          expect(res.body.data.content).to.eq("test")
          expect(errors).to.be.null
          done()
        })
      })
    })

    it('it should not GET todo by wrong ID', done => {
      let testTodo = new Todo({
        content: "test"
      })
  
      testTodo.save().then(() => {
        let todoId = "wrongID";
  
        chai.request(app).get(`/todos/${todoId}`).end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })
  })

  describe('/todos POST', () => {
    it('it should create new todo', done => {
      let todoParams = {
        content: "test"
      }
  
      chai.request(app).post('/todos')
      .send(todoParams).end((errors, res) => {
        expect(res).to.be.status(200)
        expect(res.body.data.content).to.equal("test")
        expect(errors).to.be.null
        done()
      })
    })

    it('it should not create todo without content', done => {
      let todoParams = {
        content: ""
      }
  
      chai.request(app).post('/todos')
      .send(todoParams).end((errors, res) => {
        expect(res).to.be.status(500)
        done()
      })
    })
  })

  describe('/todos PUT', () => {
    it('it should update todo', done => {
      let testTodo = new Todo({
        content: "test"
      })
  
      testTodo.save().then(todo => {
        let todoId = todo._id;
        chai.request(app).patch(`/todos/${todoId}`)
        .send({
          content: "updated!"
        }).end((errors, res) => {
          expect(res).to.be.status(200)
          expect(res.body.data.content).to.equal("updated!")
          expect(errors).to.be.null
          done()
        })
      })
    })

    it('it should not update todo without content', done => {
      let testTodo = new Todo({
        content: "test"
      })
  
      testTodo.save().then(todo => {
        let todoId = todo._id;
        chai.request(app).patch(`/todos/${todoId}`)
        .send({
          content: ""
        }).end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })
  })

  describe('/todos/:id DELETE', () => {
    it('it should delete todo', done => {
      let testTodo = new Todo({
        content: "test"
      })
  
      testTodo.save().then(todo => {
        expect(todo).to.have.property("_id")
        let todoId = todo._id;
        chai.request(app).delete(`/todos/${todoId}`)
        .end((errors, res) => {
          expect(res).to.be.status(200)
          expect(errors).to.be.null
          done()
        })
      })
    })

    it('it should not delete todo with wrong id', done => {
      let testTodo = new Todo({
        content: "test"
      })
  
      testTodo.save().then(todo => {
        expect(todo).to.have.property("_id")
        let todoId = "wrongID";
        chai.request(app).delete(`/todos/${todoId}`)
        .end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })
  })

  describe('function getTodoParams', () => {
    it('return content', () => {
      let body = {
        content: "test"
      }

      let result = todosController.getTodoParams(body)

      expect(result).to.deep.includes({
        content: "test"
      })
    })

    it('return content', () => {
      let body = {
        content: "test"
      }

      expect(todosController.getTodoParams(body)).to.deep.includes({
        content: "test"
      })
    })
  })
})