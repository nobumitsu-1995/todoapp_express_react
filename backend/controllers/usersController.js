const User = require('../models/user'),
passport = require('passport')

const getUserParams = body => {
  return {
    name: body.name,
    email: body.email,
  }
}

module.exports = {
  getUserParams,
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.json(user)
      })
      .catch(error => {
        console.error(`GET /user/${userId}: ${error.message}`);
        next(error)
      })
  },

  create: (req, res) => {
    if (req.skip) {
      res.status(500)
      res.json({
        message: req.session.flash
      })
    }

    let newUser = new User(getUserParams(req.body))
    
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `${user.name}'s account is created!`)
        res.json({
          id: user._id,
          name: user.name,
          email: user.email
        })
      } else {
        console.error(`POST /user: ${error.message}`);
        res.status(500)
        res.json({
          error: error
        })
      }
    })
  },

  update: (req, res) => {
    if (req.skip) {
      res.status(500)
      res.json({
        message: req.session.flash
      })
    }
    
    let userId = req.params.id,
    userParams = getUserParams(req.body)
    
    User.findByIdAndUpdate(userId, {
      $set: userParams
    }, { new: true })
      .then(user => {
        res.json({
          id: user._id,
          name: user.name,
          email: user.email
        })
      })
      .catch(error => {
        console.error(`PATCH /user/${userId}: ${error.message}`);
        res.status(500)
        res.json({
          error: error
        })
      })
  },

  delete: (req, res, next) => {
    let userId = req.params.id;

    User.findByIdAndDelete(userId)
      .then(() => {
        res.json({})
      })
      .catch(error => {
        console.error(`DELETE /user/${userId}: ${error.message}`);
        next(error)
      })
  },

  authenticate: (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if(!user) {
        res.status(401)
        res.json({
          message: "authenticate false!"
        })
      } else {
        console.log(info);
        res.json({
          id: user._id,
          message: "authenticate success!"
        })
      }
    })(req, res)
  },

  validate: (req, res, next) => {
    req.sanitizeBody("email").normalizeEmail({
      all_lowercase: true
    }).trim();
    req.check("email", "Email is invalid").isEmail();
    req.check("password", "Password cannot be empty").notEmpty();
    req.getValidationResult().then(error => {
      if (!error.isEmpty()) {
        req.skip = true
        let messages = error.array().map(e => e.msg);
        req.flash("error", messages.join(" and "))
        next()
      } else {
        next()
      }
    })
  }
}