// Models
const { Task } = require('../models/task.model');

const taskExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id } });

    //  If task doesn't exist, send error message
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found',
      });
    }
    // req.anyPropName = 'anyValue'
    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  taskExists,
};
