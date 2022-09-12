const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join('. ');

    return res.status(400).json({
      status: 'error',
      message,
    });
  }
  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),

  body('email').isEmail().withMessage('Must provide a valid email'),

  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  checkValidations,
];

const createTaskValidators = [
  body('title')
    .isString()
    .withMessage('Title must be a string')
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters'),

  body('startDate')
    .isDate()
    .withMessage('Must be a “YYYY-MM-DD HH:mm:ss” date')
    .notEmpty()
    .withMessage('Start date cannot be empty'),
  body('limitDate')
    .isDate()
    .withMessage('Must be a “YYYY-MM-DD HH:mm:ss” date')
    .notEmpty()
    .withMessage('Limit date cannot be empty'),
];

module.exports = { createUserValidators, createTaskValidators };
