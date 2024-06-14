const Income = require('../models/Income');
const Transaction = require('../models/Transaction');
const Balance = require('../models/Balance');

exports.addIncome = async (req, res) => {
  const { amount, source, description } = req.body;
  const user_id = req.user.id;

  try {
    const result = await Income.create(user_id, amount, source, description);
    await Transaction.create(user_id, amount, 'income', description);
    await Balance.createOrUpdate(user_id, amount);
    res.status(201).json({ message: 'Income added successfully', incomeId: result.insertId });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateIncome = async (req, res) => {
  const { income_id, amount, source, description } = req.body;
  const user_id = req.user.id;

  try {
    const income = await Income.findById(income_id);
    if (!income || income.user_id !== user_id) {
      return res.status(404).json({ error: 'Income not found or not authorized' });
    }

    const amountDifference = amount - income.amount;
    await Income.update(income_id, user_id, amount, source, description);
    await Transaction.deleteByUserIdAndDescription(user_id, income.description);
    await Transaction.create(user_id, amount, 'income', description);
    await Balance.createOrUpdate(user_id, amountDifference);
    res.status(200).json({ message: 'Income updated successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteIncome = async (req, res) => {
  const { income_id } = req.body;
  const user_id = req.user.id;

  try {
    const income = await Income.findById(income_id);
    if (!income || income.user_id !== user_id) {
      return res.status(404).json({ error: 'Income not found' });
    }

    await Income.delete(income_id);
    await Transaction.deleteByUserIdAndDescription(user_id, income.description);
    await Balance.createOrUpdate(user_id, -income.amount);

    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getIncome = async (req, res) => {
  const user_id = req.user.id;

  try {
    const incomes = await Income.findByUserId(user_id);
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};
