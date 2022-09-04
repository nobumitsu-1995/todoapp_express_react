const Todo = require('../models/todo')

const getTodoParams = body => {
  return {
    content: body.content
  }
}

module.exports = {
  index: (req, res) => {
    Todo.find({})
      .then(todos => {
        res.json(todos)
      })
      .catch(error => {
        console.error(`GET /todos: ${error.message}`);
      })
  },

  show: (req, res) => {
    let todoId = req.params.id;
    Todo.findById(todoId)
      .then(todo => {
        res.json(todo)
      })
      .catch(error => {
        console.error(`GET /todo/${todoId}: ${error.message}`);
      })
  },

  create: (req, res) => {
    let todoParams = getTodoParams(req.body);
    Todo.create(todoParams)
      .then(todo => {
        res.json(todo)
      })
      .catch(error => {
        console.error(`POST /todo: ${error.message}`);
      })
  },

  update: (req, res) => {
    let todoParams = getTodoParams(req.body),
    todoId = req.params.id;
    Todo.findByIdAndUpdate(todoId, {
      $set: todoParams
    })
      .then(todo => {
        res.json(todo)
      })
      .catch(error => {
        console.error(`PUT /todo/${todoId}: ${error.message}`);
      })
  },

  delete: (req, res) => {
    let todoId = req.params.id;
    Todo.findByIdAndDelete(todoId)
      .then(() => {
        res.json({
          message: `Successfully delete Todo!`
        })
      })
      .catch(error => {
        console.error(`DELETE /todo/${todoId}: ${error.message}`);
      })
  }
}