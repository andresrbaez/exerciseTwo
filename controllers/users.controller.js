const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'active' },
      include: [{ model: Task }],
    });

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password from response
    newUser.password = undefined;

    // 201 -> Success and a resource has been created
    res.status(201).json({
      status: 'success',
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const { user } = req;

    // Method 1

    // Method 2
    await user.update({ name });

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    // If user exists, remove from db
    //* Method 1: Delete by using the model
    // User.destroy({ where: { id } })

    //* Method 2: Delete by using the model's instance
    // await user.destroy()

    //* Method 3: Soft delete
    await user.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
