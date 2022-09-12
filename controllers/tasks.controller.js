const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: User }],
    });

    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const getStatusTasks = async (req, res) => {
  try {
    const { status } = req.params;

    const tasks = await Task.findOne({ where: { status } });

    //  If registration doesn't exist, send error message
    if (!tasks) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found, prove another one',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;

    const newTask = await Task.create({
      title,
      userId,
      startDate,
      limitDate,
    });

    // 201 -> Success and a resource has been created
    res.status(201).json({
      status: 'success',
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task } = req;

    await task.update({ finishDate });
    if (task.limitDate >= task.finishDate) {
      await task.update({ status: 'completed' });
    } else if (task.limitDate < task.finishDate) {
      await task.update({ status: 'late' });
    }

    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;

    // Soft delete
    await task.update({ status: 'cancelled' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getStatusTasks,
};
