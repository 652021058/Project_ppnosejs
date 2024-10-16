const express = require('express');

const { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction }
= require('../controllers/transactionController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();
router.get('/transactions',authenticateToken , getTransactions);
router.get('/transaction/:id',authenticateToken, getTransaction);
router.post('/transction',authenticateToken, createTransaction);
router.put('/transaction/:id',authenticateToken, updateTransaction);
router.delete('/transaction/:id',authenticateToken, deleteTransaction);

module.exports = router;