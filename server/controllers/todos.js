const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
module.exports = {

  create(req, res) {
    return Todo
      .create({
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems'
        }]
      })
      .then(todos => res.status(200).json(todos))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Todo.findByPk(req.params.todoId, {
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    })
      .then(todo => {
        if (!todo) {
          return res.status(404).json({
            errmsg: "Not found!"
          })
        }
        return res.status(200).json(todo)
      }).catch(err => res.status(400).json(err));
  },

  update(req, res) {
    return Todo.findByPk(req.params.todoId, {
      include: [{
        model: TodoItem,
        as: 'todoItems'
      }]
    })
      .then(todo => {

        if (!todo) {
          return res.status(404).json({
            errmsg: "Not found!"
          })
        }
        return todo.update({
          title: req.body.title || todo.title,
        })
          .then(() => res.status(200).json(todo))
          .catch((err) => res.status(400).json(err))
      })
      .catch((err) => res.status().json(err))
  },

  delete(req, res) {
    let todo_id = req.params.todoId;
    
    return Todo.findByPk(todo_id).then(todo => {
      if (!todo) {
        return res.status(401).json("Not found!");
      }
      return todo.destroy()
        .then(r => res.status(200).json({ success: true, })
          .catch(err => res.status(400).json(err))
        )
        .catch(err => res.status(400).json(err));
    })
  }

}
