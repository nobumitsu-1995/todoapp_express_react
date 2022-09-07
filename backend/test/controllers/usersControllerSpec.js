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
          expect(res.body.data.name).to.eq("test user")
          expect(res.body.data.email).to.eq("test@email.com")
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
        password: "password123"
      })
    })
  })
})