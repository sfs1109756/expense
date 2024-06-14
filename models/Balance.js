const pool = require('../config/db');

const Balance = {
  findByUserId: async (user_id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM balance WHERE user_id = ?',
      [user_id]
    );
    return rows[0];
  },
  createOrUpdate: async (user_id, amount) => {
    const balance = await Balance.findByUserId(user_id);
    if (balance) {
      const [result] = await pool.execute(
        'UPDATE balance SET current_balance = current_balance + ? WHERE user_id = ?',
        [amount, user_id]
      );
      return result;
    } else {
      const [result] = await pool.execute(
        'INSERT INTO balance (user_id, current_balance) VALUES (?, ?)',
        [user_id, amount]
      );
      return result;
    }
  }
};

module.exports = Balance;
