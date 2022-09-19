process.env.NODE_ENV = 'test';

const chai = require('chai'),
{ expect } = chai,
Todo = require('../../models/todo'),
User = require('../../models/user'),
todosController = require('../../controllers/todosController'),
app = require('../../main'),
chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

beforeEach( done => {
  Todo.remove({})
    .then(() => {
      User.remove({})
      .then(() => {
        done()
      })
    })
})

describe('todosController', () => {
  describe('/todos GET', () => {
    it('it should GET all todos', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let testTodo = new Todo({
          content: "test",
          userId: userId
        })
    
        testTodo.save().then(() => {
          chai.request(app).get(`/todos/index/${userId}`).end((errors, res) => {
            expect(res).to.be.status(200)
            expect(res.body.length).to.eq(1)
            expect(errors).to.be.null
            done()
          })
        })
      })
    })
  })

  describe('/todos/:id GET', () => {
    it('it should GET todo by ID', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let testTodo = new Todo({
          content: "test",
          userId: userId
        })
    
        testTodo.save().then(todo => {
          let todoId = todo._id;
    
          chai.request(app).get(`/todos/${todoId}`).end((errors, res) => {
            expect(res).to.be.status(200)
            expect(res.body.content).to.eq("test")
            expect(errors).to.be.null
            done()
          })
        })
      })
    })

    it('it should not GET todo by wrong ID', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let testTodo = new Todo({
          content: "test",
          userId: userId
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
  })

  describe('/todos POST', () => {
    it('it should create new todo', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let todoParams = {
          content: "test",
          userId: userId
        }
    
        chai.request(app).post('/todos')
        .send(todoParams).end((errors, res) => {
          expect(res).to.be.status(200)
          expect(res.body.content).to.equal("test")
          expect(errors).to.be.null
          done()
        })
      })
    })

    it('it should not create todo without content', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let todoParams = {
          content: "",
          userId: userId
        }
    
        chai.request(app).post('/todos')
        .send(todoParams).end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })
  })

  describe('/todos PATCH', () => {
    it('it should update todo', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let testTodo = new Todo({
          content: "test",
          userId: userId
        })
    
        testTodo.save().then(todo => {
          let todoId = todo._id;
          chai.request(app).patch(`/todos/${todoId}`)
          .send({
            content: "updated!",
          }).end((errors, res) => {
            expect(res).to.be.status(200)
            expect(res.body.content).to.equal("updated!")
            expect(errors).to.be.null
            done()
          })
        })
      })
    })

    it('it should not update todo without content', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let testTodo = new Todo({
          content: "test",
          userId: userId
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
  })

  describe('/todos/:id DELETE', () => {
    it('it should delete todo', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let testTodo = new Todo({
          content: "test",
          userId: userId
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
    })

    it('it should not delete todo with wrong id', done => {
      User.create({
        name: "sample",
        email: "sample@email.com",
        password: "password"
      })
      .then(user => {
        const userId = user._id

        let testTodo = new Todo({
          content: "test",
          userId: userId
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
  })

  describe('function getTodoParams', () => {
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