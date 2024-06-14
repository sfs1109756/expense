const pool = require('../config/db');

const FriendTransaction = {
  create: async (user_id, friend_id, amount, type, description) => {
    const [result] = await pool.execute(
      'INSERT INTO friend_transactions (user_id, friend_id, amount, type, description) VALUES (?, ?, ?, ?, ?)',
      [user_id, friend_id, amount, type, description]
    );
    return result;
  },
  findByUserId: async (user_id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM friend_transactions WHERE user_id = ?',
      [user_id]
    );
    return rows;
  },
  findByFriendId: async (friend_id) => {
    const [rows] = await pool.execute(
      'SELECT * FROM friend_transactions WHERE friend_id = ?',
      [friend_id]
    );
    return rows;
  }
};

module.exports = FriendTransaction;
