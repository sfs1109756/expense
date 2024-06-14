const Friend = require('../models/Friend');
const FriendTransaction = require('../models/FriendTransaction');

exports.addFriend = async (req, res) => {
  const { name, email, amount } = req.body;
  const user_id = req.user.id;

  try {
    // Check if the friend name already exists for the user
    const existingFriend = await Friend.findByName(user_id, name);
    if (existingFriend) {
      return res.status(400).json({ error: 'Friend with this name already exists' });
    }

    const result = await Friend.create(user_id, name, email, amount);
    const friendId = result.insertId;

    // If an initial amount is provided, create a transaction
    if (amount && amount > 0) {
      await FriendTransaction.create(user_id, friendId, amount, 'give', 'Initial amount given');
    }

    res.status(201).json({ message: 'Friend added successfully', friendId: friendId });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getFriends = async (req, res) => {
  const user_id = req.user.id;

  try {
    const friends = await Friend.findByUserId(user_id);
    res.status(200).json(friends);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.giveAmount = async (req, res) => {
  const { friend_id, amount, description } = req.body;
  const user_id = req.user.id;

  try {
    const friend = await Friend.findById(friend_id);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    await Friend.updateAmount(friend_id, amount);
    await FriendTransaction.create(user_id, friend_id, amount, 'give', description);

    res.status(200).json({ message: 'Amount given to friend successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.receiveAmount = async (req, res) => {
  const { friend_id, amount, description } = req.body;
  const user_id = req.user.id;

  try {
    const friend = await Friend.findById(friend_id);
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    await Friend.updateAmount(friend_id, -amount);
    await FriendTransaction.create(user_id, friend_id, amount, 'receive', description);

    res.status(200).json({ message: 'Amount received from friend successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteFriend = async (req, res) => {
  const { friend_id } = req.body;
  const user_id = req.user.id;

  try {
    const friend = await Friend.findById(friend_id);
    if (!friend || friend.user_id !== user_id) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    await Friend.delete(friend_id);
    res.status(200).json({ message: 'Friend deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getFriendTransactions = async (req, res) => {
  const { friend_id } = req.params;
  const user_id = req.user.id;

  try {
    const friend = await Friend.findById(friend_id);
    if (!friend || friend.user_id !== user_id) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    const transactions = await FriendTransaction.findByFriendId(friend_id);
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
