const express = require('express');
const { body, validationResult } = require('express-validator');

// Controllers
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

// Middlewares
const { taskExists } = require('../middlewares/tasks.middlewares');
const { createTaskValidators } = require('../middlewares/validators.middlewares')

const usersRouter = express.Router();

// Users endpoints
usersRouter.post(
'/', 
createTaskValidators,
createTask
);

usersRouter.get('/', getAllTasks);

usersRouter.get('/:status', getAllTasks);

usersRouter.patch('/:id', taskExists, updateTask);

usersRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };
