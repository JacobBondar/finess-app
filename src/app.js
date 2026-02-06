const express = require('express');

// cors = security
const cors = require('cors');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tells the server that its ok to get req from other addresses
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'השרת פועל',
    timestamp: new Date().toISOString()
  });
});

// Mount API routes
app.use('/api', routes);

// 404 handler and Error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;