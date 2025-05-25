const express = require('express');
const TodoController = require('../controllers/todoController');

const router = express.Router();
const todoController = new TodoController();

function setRoutes(app) {
    router.get('/', todoController.getAllTasks.bind(todoController));
    router.post('/', todoController.addTask.bind(todoController));
    router.get('/edit/:id', todoController.getTaskById.bind(todoController));
    router.post('/edit/:id', todoController.editTask.bind(todoController));
    router.post('/delete/:id', todoController.deleteTask.bind(todoController));
    router.get('/filter', todoController.filterTasks.bind(todoController));

    app.use('/', router);
}

module.exports = setRoutes;