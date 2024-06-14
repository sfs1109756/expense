const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, expenseController.addExpense);
router.put('/update', authMiddleware, expenseController.updateExpense);
router.delete('/delete', authMiddleware, expenseController.deleteExpense);
router.get('/', authMiddleware, expenseController.getExpenses);

module.exports = router;
