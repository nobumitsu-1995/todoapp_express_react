process.env.NODE_ENV = 'test';

const User = require('../../models/user'),
{ expect } = require('chai');

require( '../../main' );

beforeEach( done => {
  User.remove({})
    .then(() => {
      done();
    })
})

describe('save User', () => {
  it('it should save one user', (done) => {
    let testUser = new User({
      name: "test user",
      email: "test@email.com",
      password: "password123"
    });

    testUser.save()
      .then(() => {
        User.find({})
          .then( result => {
            expect(result.length).to.eq(1)
            expect(result[0]).to.have.property('_id')
            expect(result[0]).to.have.property('createdAt')
            expect(result[0].name).to.eq("test user")
            expect(result[0].email).to.eq("test@email.com")
            done()
          })
      })
  })

  it('When success to save user, password is crypted', (done) => {
    let testUser = new User({
      name: "test user",
      email: "test@email.com",
      password: "password123"
    });

    testUser.save()
      .then(() => {
        User.find({})
          .then( result => {
            expect(result.length).to.eq(1)
            expect(result[0]).to.have.property('_id')
            expect(result[0]).to.have.property('createdAt')
            expect(result[0].password).not.to.eq("password123")
            done()
          })
      })
  })

  it('it should trim email', done => {
    let testUser = new User({
      name: "test user",
      email: "test@email.com ",
      password: "passord123"
    });

    testUser.save()
      .then(() => {
        User.find({})
          .then( result => {
            expect(result.length).to.eq(1)
            expect(result[0]).to.have.property('_id')
            expect(result[0]).to.have.property('createdAt')
            expect(result[0].name).to.eq("test user")
            expect(result[0].email).to.eq("test@email.com")
            done()
          })
          .catch(error => {
            console.error(error);
            done()
          })
      })
  })

  it('it should save email lowercase', done => {
    let testUser = new User({
      name: "test user",
      email: "TEST@email.com",
      password: "password123"
    });

    testUser.save()
      .then(() => {
        User.find({})
          .then( result => {
            expect(result.length).to.eq(1)
            expect(result[0]).to.have.property('_id')
            expect(result[0]).to.have.property('createdAt')
            expect(result[0].name).to.eq("test user")
            expect(result[0].email).to.eq("test@email.com")
            done()
          })
      })
  })

  it('it should not save one user without name', done => {
    let testUser = new User({
      name: "",
      email: "test@email.com",
      password: "password123"
    });

    testUser.save()
      .catch( error => {
        expect(error).to.have.property('message')
        done()
      })
  })

  it('it should not save one user without email', done => {
    let testUser = new User({
      name: "test",
      email: "",
      password: "password123"
    });

    testUser.save()
      .catch( error => {
        expect(error).to.have.property('message')
        done()
      })
  })

  it('it should not save one user with ununique email', done => {
    let testUser1 = new User({
      name: "test1",
      email: "test@email.com",
      password: "password123"
    });

    let testUser2 = new User({
      nema: "test2",
      email: "test@email.com",
      password: "password456"
    })

    testUser1.save()
      .then(() => {
        testUser2.save()
          .catch(error => {
            expect(error).to.have.property('message')
            done()
          })
      })
  })

  it('it should not save one user without password', done => {
    let testUser = new User({
      name: "test",
      email: "test@email.com",
    });
    let password = ""
    User.register(testUser, password, (error, user) => {
      console.log(error);
      expect(user).to.eq(undefined)
      expect(!!error).to.be.true
      done()
    })
  })
})