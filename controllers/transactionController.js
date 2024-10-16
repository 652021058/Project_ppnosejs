const Transaction = require('../models/transaction');

// getTransactions
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// getTransaction
exports.getTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// createTransaction
exports.createTransaction = async (req, res) => {
    const { title, content, amount, message, date } = req.body;
    const transaction = new Transaction({ title, content, amount, message, date });
    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// updateTransaction
exports.updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        const date = {$set: req.body};
        Transaction.findByIdAndUpdate(id, date);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// deleteTransaction
exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.param.id;
        const transaction = await Transaction.findById(id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        Transaction.findByIdAndDelete(id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
