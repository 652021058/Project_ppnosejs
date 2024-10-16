const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: { type: String, required: true, unique: true }, // อีเมล (ต้องไม่ซ้ำ)
    
    password: { type: String, required: true }, // รหัสผ่าน
    
    name: { type: String, required: true }, // ชื่อจริงของผู้ใช้ 
    
    role: { type: String, required: true }, // บทบาทของผู้ใช้ (ไม่จำเป็นต้องมี)

},{timestamps:true , versionKey:false});

module.exports  = mongoose.model('User', userSchema);

