const pool = require('../config/db');

const Expense = {
  create: async (user_id, amount, category, description) => {
    const [result] = await pool.execute(
      'INSERT INTO expenses (user_id, amount, category, description) VALUES (?, ?, ?, ?)',
      [user_id, amount, category, description]
    );
    return result;
  },
  update: async (id, user_id, amount, category, description) => {
    const [result] = await pool.execute(
      'UPDATE expenses SET amount = ?, category = ?, description = ? WHERE id = ? AND user_id = ?',
      [amount, category, description, id, user_id]
    );
    return result;
  },
  findByUserId: async (user_id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses WHERE user_id = ?',
      [user_id]
    );
    return rows;
  },
  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM expenses WHERE id = ?',
      [id]
    );
    return rows[0];
  },
  delete: async (id) => {
    const [result] = await pool.execute(
      'DELETE FROM expenses WHERE id = ?',
      [id]
    );
    return result;
  }
};

module.exports = Expense;
