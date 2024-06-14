const pool = require('../config/db');

const Transaction = {
  create: async (user_id, amount, type, description) => {
    const [result] = await pool.execute(
      'INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
      [user_id, amount, type, description]
    );
    return result;
  },
  findByUserId: async (user_id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM transactions WHERE user_id = ?',
      [user_id]
    );
    return rows;
  },
  deleteByUserIdAndDescription: async (user_id, description) => {
    const [result] = await pool.execute(
      'DELETE FROM transactions WHERE user_id = ? AND description = ?',
      [user_id, description]
    );
    return result;
  },
  deleteById: async (id) => {
    const [result] = await pool.execute(
      'DELETE FROM transactions WHERE id = ?',
      [id]
    );
    return result;
  }
};

module.exports = Transaction;
