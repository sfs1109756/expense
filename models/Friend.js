const pool = require('../config/db');

const Friend = {
  create: async (user_id, name, email, amount) => {
    const [result] = await pool.execute(
      'INSERT INTO friends (user_id, name, email, amount) VALUES (?, ?, ?, ?)',
      [user_id, name, email, amount]
    );
    return result;
  },
  findByUserId: async (user_id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM friends WHERE user_id = ?',
      [user_id]
    );
    return rows;
  },
  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM friends WHERE id = ?',
      [id]
    );
    return rows[0];
  },
  findByName: async (user_id, name) => {
    const [rows] = await pool.execute(
      'SELECT * FROM friends WHERE user_id = ? AND name = ?',
      [user_id, name]
    );
    return rows[0];
  },
  delete: async (id) => {
    const [result] = await pool.execute(
      'DELETE FROM friends WHERE id = ?',
      [id]
    );
    return result;
  },
  getAmountGiven: async (friend_id) => {
    const [rows] = await pool.execute(
      'SELECT SUM(amount) as total_given FROM friend_transactions WHERE friend_id = ? AND type = "give"',
      [friend_id]
    );
    return rows[0].total_given || 0;
  },
  getAmountReceived: async (friend_id) => {
    const [rows] = await pool.execute(
      'SELECT SUM(amount) as total_received FROM friend_transactions WHERE friend_id = ? AND type = "receive"',
      [friend_id]
    );
    return rows[0].total_received || 0;
  },
  getBalance: async (friend_id) => {
    const amountGiven = await Friend.getAmountGiven(friend_id);
    const amountReceived = await Friend.getAmountReceived(friend_id);
    return amountGiven - amountReceived;
  },
   updateAmount: async (friend_id, amount) => {
    const [result] = await pool.execute(
      'UPDATE friends SET amount = amount + ? WHERE id = ?',
      [amount, friend_id]
    );
    return result;
  }
};

module.exports = Friend;
