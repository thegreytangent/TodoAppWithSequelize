const todosController = require('../controllers').todos;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
      message: 'api',
    }));

    app.post('/api/todos', todosController.create);
    app.get('/api/todos', todosController.list);

}