const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Show all tasks
router.get('/', todoController.showAllTasks.bind(todoController));

// Add a new task
router.post('/', todoController.addTask.bind(todoController));

// Edit task (show edit form)
router.get('/edit/:id', todoController.editTask.bind(todoController));

// Update task (submit edit)
router.post('/edit/:id', todoController.updateTask.bind(todoController));

// Delete task
router.post('/delete/:id', todoController.deleteTask.bind(todoController));

// Filter tasks (GET and POST)
router.get('/filter', todoController.showFilterPage.bind(todoController));
router.post('/filter', todoController.filterTasks.bind(todoController));

module.exports = router;