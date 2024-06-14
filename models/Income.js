const pool = require('../config/db');

const Income = {
  create: async (user_id, amount, source, description) => {
    const [result] = await pool.execute(
      'INSERT INTO incomes (user_id, amount, source, description) VALUES (?, ?, ?, ?)',
      [user_id, amount, source, description]
    );
    return result;
  },
  update: async (id, user_id, amount, source, description) => {
    const [result] = await pool.execute(
      'UPDATE incomes SET amount = ?, source = ?, description = ? WHERE id = ? AND user_id = ?',
      [amount, source, description, id, user_id]
    );
    return result;
  },
  findByUserId: async (user_id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM incomes WHERE user_id = ?',
      [user_id]
    );
    return rows;
  },
  findById: async (id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM incomes WHERE id = ?',
      [id]
    );
    return rows[0];
  },
  delete: async (id) => {
    const [result] = await pool.execute(
      'DELETE FROM incomes WHERE id = ?',
      [id]
    );
    return result;
  }
};

module.exports = Income;
