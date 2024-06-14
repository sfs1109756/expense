const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const friendRoutes = require('./routes/friendRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Expense Tracker API');
});

module.exports = app;
