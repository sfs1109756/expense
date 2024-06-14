const pool = require('../config/db');

const Friend = {
  create: async (user_id, name, email, amount = 0) => {
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
  findById: async (friend_id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM friends WHERE id = ?',
      [friend_id]
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
  delete: async (friend_id) => {
    const [result] = await pool.execute(
      'DELETE FROM friends WHERE id = ?',
      [friend_id]
    );
    return result;
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
