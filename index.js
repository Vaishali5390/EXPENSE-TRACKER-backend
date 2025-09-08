const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { db, initializeDatabase } = require('./lib/db');
const expensesRouter = require('./routes/expenses');
const categoriesRouter = require('./routes/categories');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
	return res.json({ status: 'ok' });
});

// Root message
app.get('/', (req, res) => {
	return res.send('Expense Tracker API is running. Try GET /api/health');
});

// Routers
app.use('/api/expenses', expensesRouter);
app.use('/api/categories', categoriesRouter);

const PORT = process.env.PORT || 4000;

initializeDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Backend listening on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error('Failed to initialize database', err);
		process.exit(1);
	});

module.exports = { app, db };


