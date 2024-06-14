const Expense = require('../models/Expense');
const Transaction = require('../models/Transaction');
const Balance = require('../models/Balance');

exports.addExpense = async (req, res) => {
  const { amount, category, description } = req.body;
  const user_id = req.user.id;

  try {
    const result = await Expense.create(user_id, amount, category, description);
    await Transaction.create(user_id, amount, 'expense', description);
    await Balance.createOrUpdate(user_id, -amount);
    res.status(201).json({ message: 'Expense added successfully', expenseId: result.insertId });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateExpense = async (req, res) => {
  const { expense_id, amount, category, description } = req.body;
  const user_id = req.user.id;

  try {
    const expense = await Expense.findById(expense_id);
    if (!expense || expense.user_id !== user_id) {
      return res.status(404).json({ error: 'Expense not found or not authorized' });
    }

    const amountDifference = amount - expense.amount;
    await Expense.update(expense_id, user_id, amount, category, description);
    await Transaction.deleteByUserIdAndDescription(user_id, expense.description);
    await Transaction.create(user_id, amount, 'expense', description);
    await Balance.createOrUpdate(user_id, -amountDifference);
    res.status(200).json({ message: 'Expense updated successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { expense_id } = req.body;
  const user_id = req.user.id;

  try {
    const expense = await Expense.findById(expense_id);
    if (!expense || expense.user_id !== user_id) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await Expense.delete(expense_id);
    await Transaction.deleteByUserIdAndDescription(user_id, expense.description);
    await Balance.createOrUpdate(user_id, expense.amount);

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getExpenses = async (req, res) => {
  const user_id = req.user.id;

  try {
    const expenses = await Expense.findByUserId(user_id);
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};
