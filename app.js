const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes')
const { tasksRouter } = require('./routes/post.routes')

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json()); // Middleware

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

// Catch non-existing endpoints
app.all('*', (req, res) => {
    
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${req.url} doesn't exists in our server`,
  });
});

module.exports = { app };