const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const dotenv = require('dotenv');
dotenv.config();

// REGISTER 
exports.register = async (req, res) => {
    const { email, password, name, role } = req.body; // เพิ่ม name
    try {
        if (!name) return res.status(400).send("Name is required");

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name, role }); // รวม name
        await user.save();
        res.status(201).send("User registered");
    } catch (err) {
        if (err.code === 11000) { // รหัสข้อผิดพลาดสำหรับค่าที่ซ้ำซ้อน
            return res.status(400).send("Email already exists");
        }
        res.status(400).send(err.message);
    }
};



// LOGIN 
exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);
    try {
        const tmpuser = await User.findOne({ email });
        if (!tmpuser) return res.status(400).send("Email not found");
        const isMatch = await bcrypt.compare(password, tmpuser.password);
        if (!isMatch) return res.status(400).send("Incorrect password");
        console.log();

        const user = await User.findOne({ email }).select("-password");

        const accessToken = jwt.sign(
            { userId: tmpuser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        const refreshToken = jwt.sign(
            { userId: tmpuser._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1h" } 
        );
        res.json({ user, accessToken, refreshToken });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// REFRESH TOKEN
exports.refresh = async(req,res) =>{
    const token = req.headers['authorization']?.split(' ')[1]; // 'Bearer <token>'
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token , process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).send("Refresh token expired. Please log in again.");
            }
            return res.status(403).send("Invalid refresh token");
        }

        const accessToken = jwt.sign(
            {userID: user.userId},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        );
        res.json({accessToken});
    })
}
