const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const morgan = require('morgan')
const authRoutes = require('./routes/authRoutes');
const friendRoutes = require('./routes/friendRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Enable CORS
app.use(cors({
  origin: '*', // Replace with your frontend URL
}));
app.use(morgan('combined'))
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
