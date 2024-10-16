const mongoose = require('mongoose');

const transactionschema = new mongoose.Schema({
    title: {type: String , required: true},
    content: {type: String , required: true},
    amount: { type: String, required: true }, // จำนวนเงินที่ทำธุรกรรม
    message: {type: String , required: true},
    date: {type: Date , default: Date.now, required: true}, // เพิ่ม default ให้เป็นวันที่ปัจจุบัน
},{timestamps:true , versionKey:false});

module.exports = mongoose.model('transaction', transactionschema);
