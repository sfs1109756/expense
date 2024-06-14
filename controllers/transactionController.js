const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  const user_id = req.user.id;

  try {
    const transactions = await Transaction.findByUserId(user_id);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};
