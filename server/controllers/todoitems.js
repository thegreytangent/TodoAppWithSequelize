const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        return TodoItem.create({
            content : req.body.content,
            todoId: req.params.todoId
        })
        .then(r => res.status(201).json(r))
        .catch(error => res.status(400).send(error))
    }
};