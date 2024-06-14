const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, incomeController.addIncome);
router.put('/update', authMiddleware, incomeController.updateIncome);
router.delete('/delete', authMiddleware, incomeController.deleteIncome);
router.get('/', authMiddleware, incomeController.getIncome);

module.exports = router;
