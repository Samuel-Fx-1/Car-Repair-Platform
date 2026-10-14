const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const { pageData } = indexRouter;

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('index', {
    title: 'Page Not Found - Jade & Andy Vintage Specialist',
    metaDescription: 'The page you requested could not be found.',
    ...pageData
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error. Please try again later.' });
});

module.exports = app;