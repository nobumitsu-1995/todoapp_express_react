process.env.NODE_ENV = 'test';

const chai = require('chai'),
{ expect } = chai,
User = require('../../models/user'),
usersController = require('../../controllers/usersController'),
app = require('../../main'),
chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

beforeEach( done => {
  User.remove({})
    .then(() => {
      done();
    })
})

describe('usersController', () => {
  describe('/user/:id GET', () => {
    it('it should GET user by ID', done => {
      let testUser = new User({
        name: "test user",
        email: "test@email.com",
        password: "password123"
      })
  
      testUser.save().then(user => {
        let userId = user._id;
  
        chai.request(app).get(`/user/${userId}`).end((errors, res) => {
          expect(res).to.be.status(200)
          expect(res.body.name).to.eq("test user")
          expect(res.body.email).to.eq("test@email.com")
          expect(errors).to.be.null
          done()
        })
      })
    })

    it('it should not GET user by wrong ID', done => {
      let testUser = new User({
        name: "test user",
        email: "test@email.com",
        password: "password123"
      })
  
      testUser.save().then(() => {
        let userId = "wrongID";
  
        chai.request(app).get(`/user/${userId}`).end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })
  })

  describe('/user POST', () => {
    it('it should create new user', done => {
      let userParams = {
        name: "test user",
        email: "Test@email.com",
        password: "password123"
      }

      chai.request(app).post('/user')
      .send(userParams).end((errors, res) => {
        expect(res).to.be.status(200)
        expect(res.body.name).to.equal("test user")
        expect(res.body.email).to.equal("test@email.com")
        expect(res.body.password).to.equal(undefined)
        expect(errors).to.be.null
        done()
      })
    })

    it('it should not create new user with invalid email', done => {
      let userParams = {
        name: "test user",
        email: "testemail.com",
        password: "password123"
      }

      chai.request(app).post('/user')
      .send(userParams).end((errors, res) => {
        expect(res.body.message).to.have.property("error")
        expect(res.body.message.error[0]).to.equal("Email is invalid")
        expect(res).to.be.status(500)
        done()
      })
    })

    it('it should not create new user without email', done => {
      let userParams = {
        name: "test user",
        email: "",
        password: "password123"
      }

      chai.request(app).post('/user')
      .send(userParams).end((errors, res) => {
        expect(res.body.message).to.have.property("error")
        expect(res.body.message.error[0]).to.equal("Email is invalid")
        expect(res).to.be.status(500)
        done()
      })
    })

    it('it should not create new user without password', done => {
      let userParams = {
        name: "test user",
        email: "test@email.com",
        password: ""
      }

      chai.request(app).post('/user')
      .send(userParams).end((errors, res) => {
        expect(res.body.message).to.have.property("error")
        expect(res.body.message.error[0]).to.equal("Password cannot be empty")
        expect(res).to.be.status(500)
        done()
      })
    })

    it('it should not create new user with same email', done => {
      let userParams = {
        name: "test user",
        email: "test@email.com",
        password: "password123"
      }

      User.create(userParams).then(() => {
        chai.request(app).post('/user')
        .send(userParams).end((errors, res) => {
          expect(res.body.error.name).to.equal("UserExistsError")
          expect(res).to.be.status(500)
          done()
        })
      })
    })
  })

  describe('/user/:id DELETE', () => {
    it('it should delete user', done => {
      let testUser = new User({
        name: "test user",
        email: "test@email.com",
        password: "password123"
      })
  
      testUser.save().then(user => {
        expect(user).to.have.property("_id")
        let userId = user._id;
        chai.request(app).delete(`/user/${userId}`)
        .end((errors, res) => {
          expect(res).to.be.status(200)
          expect(errors).to.be.null
          done()
        })
      })
    })

    it('it should not delete user with wrong id', done => {
      let testUser = new User({
        name: "test user",
        email: "test@email.com",
        password: "password123"
      })
  
      testUser.save().then(user => {
        expect(user).to.have.property("_id")
        let userId = "wrongID";
        chai.request(app).delete(`/user/${userId}`)
        .end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })
  })

  describe('/user/:id PATCH', () => {
    it('it should update user', done => {
      let newUser = new User({
        name: "test user",
        email: "Test@email.com",
        password: "password123"
      })

      newUser.save().then(user => {
        let userId = user._id
        chai.request(app).patch(`/user/${userId}`)
        .send({
          name: "updated!",
          email: "Test@email.com",
          password: "password123"
        }).end((errors, res) => {
          expect(res).to.be.status(200)
          expect(res.body.name).to.equal("updated!")
          expect(res.body.email).to.equal("test@email.com")
          expect(res.body.password).to.equal(undefined)
          expect(errors).to.be.null
          done()
        })
      })
    })

    it('it should not update user with invalid email', done => {
      let newUser = new User({
        name: "test user",
        email: "Test@email.com",
        password: "password123"
      })

      newUser.save().then(user => {
        let userId = user._id
        chai.request(app).patch(`/user/${userId}`)
        .send({
          name: "test user",
          email: "testemail.com",
          password: "password123"
        })
        .end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })

    it('it should not update user without email', done => {
      let newUser = new User({
        name: "test user",
        email: "Test@email.com",
        password: "password123"
      })

      newUser.save().then(user => {
        let userId = user._id
        chai.request(app).patch(`/user/${userId}`)
        .send({
          name: "test user",
          email: "",
          password: "password123"
        })
        .end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })

    it('it should not update user without password', done => {
      let newUser = new User({
        name: "test user",
        email: "Test@email.com",
        password: "password123"
      })

      newUser.save().then(user => {
        let userId = user._id
        chai.request(app).patch(`/user/${userId}`)
        .send({
          name: "test user",
          email: "test@email.com",
          password: ""
        })
        .end((errors, res) => {
          expect(res).to.be.status(500)
          done()
        })
      })
    })

    it('it should not update user with same email', done => {
      let userParams1 = {
        name: "test user",
        email: "Test@email.com",
        password: "password123"
      }

      let userParams2 = {
        name: "test user",
        email: "Test2@email.com",
        password: "password123"
      }
      
      User.create(userParams1).then(() => {
        chai.request(app).post('/user')
        .send(userParams2).end((errors, res) => {
          expect(res).to.be.status(200)
          chai.request(app).patch(`/user/${res.body.id}`)
          .send({
            name: "test user",
            email: "Test@email.com",
            password: "password123"
          })
          .end((erorrs, res) => {
            expect(res).to.be.status(500)
            done()
          })
        })
      })
    })
  })

  describe('function getUserParams', () => {
    it('return content', () => {
      let body = {
        name: "test user",
        email: "test@email.com",
        password: "password123"
      }

      expect(usersController.getUserParams(body)).to.deep.includes({
        name: "test user",
        email: "test@email.com",
      })
    })
  })

  describe('authenticate User', () => {
    it('Login success', done => {
      let newUser = new User({
        name: "test user",
        email: "test@email.com",
        password: "password123"
      })

      newUser.save().then(() => {
        chai.request(app).post('/user/login')
        .send({
          email: "test@email.com",
          password: "password123"
        }).end((errors, res) => {
          expect(res).to.be.status(404)
          done()
        })
      })
    })
  })
})