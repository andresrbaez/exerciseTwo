const express = require('express');
const { body, validationResult } = require('express-validator');

// Controllers
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getStatusTasks,
} = require('../controllers/tasks.controller');

// Middlewares
const { taskExists } = require('../middlewares/tasks.middlewares');
const {
  createTaskValidators,
} = require('../middlewares/validators.middlewares');

const tasksRouter = express.Router();

// Users endpoints
tasksRouter.post('/', createTaskValidators, createTask);

tasksRouter.get('/', getAllTasks);

tasksRouter.get('/:status', getStatusTasks);

tasksRouter.patch('/:id', taskExists, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };
