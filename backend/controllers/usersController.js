const User = require('../models/user')

const getUserParams = body => {
  return {
    name: body.name,
    email: body.email,
    password: body.password
  }
}

module.exports = {
  getUserParams,
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.json({
          data: user
        })
      })
      .catch(error => {
        console.error(`GET /user/${userId}: ${error.message}`);
        next(error)
      })
  },

  create: (req, res, next) => {
    if (req.skip) return next();
    let newUser = new User(getUserParams(req.body))
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        console.log("success");
        res.json({
          data: {
            name: user.name,
            email: user.email
          }
        })
      } else {
        console.error(`POST /user: ${error.message}`);
        next(error)
      }
    })
  },

  update: (req, res, next) => {
    if (req.skip) return next();
    let userId = req.params.id,
    userParams = getUserParams(req.body)
    
    User.findByIdAndUpdate(userId, {
      $set: userParams
    }, { new: true })
      .then(user => {
        res.json({
          data: {
            name: user.name,
            email: user.email
          }
        })
      })
      .catch(error => {
        console.error(`PATCH /user/${userId}: ${error.message}`);
        next(error)
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
        next(new Error(messages.join(" and ")))
      } else {
        next()
      }
    })
  }
}