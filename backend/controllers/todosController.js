const Todo = require('../models/todo')

const getTodoParams = body => {
  return {
    content: body.content,
    userId: body.userId
  }
}

module.exports = {
  getTodoParams,
  index: (req, res, next) => {
    Todo.find({
      userId: req.params.id
    })
      .then(todos => {
        res.json(todos)
      })
      .catch(error => {
        console.error(`GET /todos: ${error.message}`);
        next(error)
      })
  },

  show: (req, res, next) => {
    let todoId = req.params.id;
    Todo.findById(todoId)
      .then(todo => {
        res.json(todo)
      })
      .catch(error => {
        console.error(`GET /todos/${todoId}: ${error.message}`);
        next(error)
      })
  },

  create: (req, res, next) => {
    if (req.skip) return next();
    let todoParams = getTodoParams(req.body);
    Todo.create(todoParams)
      .then(todo => {
        res.json(todo)
      })
      .catch(error => {
        console.error(`POST /todos: ${error.message}`);
        next(error)
      })
  },

  update: (req, res, next) => {
    if (req.skip) return next();
    let todoParams = getTodoParams(req.body),
    todoId = req.params.id;
    Todo.findByIdAndUpdate(todoId, {
      $set: todoParams
    }, { new: true })
      .then(todo => {
        res.json(todo)
      })
      .catch(error => {
        console.error(`PUT /todos/${todoId}: ${error.message}`);
        next(error)
      })
  },

  delete: (req, res, next) => {
    let todoId = req.params.id;
    Todo.findByIdAndDelete(todoId)
      .then(() => {
        res.json({
        })
      })
      .catch(error => {
        console.error(`DELETE /todos/${todoId}: ${error.message}`);
        next(error)
      })
  },

  validate: (req, res, next) => {
    req.check("content", "content cannot be empty").notEmpty();
    req.getValidationResult().then(error => {
      if(!error.isEmpty()) {
        req.skip = true;
        let messages = error.array().map(e => e.msg);
        next(new Error(messages.join(" and ")))
      } else {
        next()
      }
    })
  }
}