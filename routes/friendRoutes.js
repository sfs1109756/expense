const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, friendController.addFriend);
router.get('/', authMiddleware, friendController.getFriends);
router.post('/give', authMiddleware, friendController.giveAmount);
router.post('/receive', authMiddleware, friendController.receiveAmount);
router.delete('/delete', authMiddleware, friendController.deleteFriend);
router.get('/:friend_id/transactions', authMiddleware, friendController.getFriendTransactions);
router.get('/:friend_id/stats', authMiddleware, friendController.getFriendStats);
module.exports = router;
