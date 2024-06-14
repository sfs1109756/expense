const Income = require('../models/Income');
const Expense = require('../models/Expense');
const Transaction = require('../models/Transaction');

exports.getStats = async (req, res) => {
  const user_id = req.user.id;

  try {
    const incomes = await Income.findByUserId(user_id);
    const expenses = await Expense.findByUserId(user_id);
    const transactions = await Transaction.findByUserId(user_id);

    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const netSavings = totalIncome - totalExpense;

    const incomeByCategory = incomes.reduce((acc, income) => {
      acc[income.source] = (acc[income.source] || 0) + income.amount;
      return acc;
    }, {});

    const expenseByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const data = {
      totalIncome,
      totalExpense,
      netSavings,
      incomeByCategory,
      expenseByCategory,
      transactions
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
