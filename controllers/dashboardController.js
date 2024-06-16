const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Transaction = require('../models/Transaction');

exports.getStats = async (req, res) => {
  const user_id = req.user.id;

  try {
    const incomes = await Income.findByUserId(user_id);
    const expenses = await Expense.findByUserId(user_id);
    const transactions = await Transaction.findByUserId(user_id);

    const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    const netSavings = totalIncome - totalExpense;

    const incomeByCategory = incomes.reduce((acc, income) => {
      acc[income.source] = (acc[income.source] || 0) + parseFloat(income.amount);
      return acc;
    }, {});

    const expenseByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {});

    const last10Incomes = incomes.slice(-10).reverse();
    const last10Expenses = expenses.slice(-10).reverse();

    const data = {
      totalIncome,
      totalExpense,
      netSavings,
      incomeByCategory,
      expenseByCategory,
      transactions,
      last10Incomes,
      last10Expenses
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
