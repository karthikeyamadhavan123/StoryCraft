const bcrypt = require('bcryptjs');
const jwt = require('../jwt/jwt');
const User = require('../models/userSchema.js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const crypto = require('../util/crypto.js');
const { welcomeEmail, sendVerificationEmail, sendResetEmailSuccessful,sendAccountDeletionEmail} = require('../nodemailer/nodemailer.js');

const Register = async (req, res) => {
    try {
        const saltRounds = 10;
        const { username, email, password, preferences } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const verificationToken = crypto.generateToken(16)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, 
            preferences: preferences || [],
        });
        await newUser.save();
        const userId = newUser._id;
        const token = jwt.createToken({ userId });
        await welcomeEmail(newUser.email);
        res.cookie('register', token, {
            maxAge: 1000 * 60 * 60 * 2,
            httpOnly:true,  // Required for HTTPS
            sameSite: "None",
            domain: '.onrender.com',
            path: '/'
        })
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId,
            username,
        });

    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }
        if (!password) {
            return res.status(400).json({ message: "Password is required." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(403).json({ message: "Passwords Not Matched." });
        }

        const userId = user._id;
        const token = jwt.createToken({ userId });
        const username = user.username
        res.cookie('login', token, {
            maxAge: 1000 * 60 * 60 * 2,
            httpOnly:true,  // Required for HTTPS
            sameSite: "None",
            domain: '.onrender.com',
            path: '/'
        })
        return res.status(200).json({ username, userId, message: "Login successful" });
    } catch (error) {
        console.log(error); 
        return res.status(500).json({ success: false, error: error.message });
    }
}

const Logout = async (req, res) => {
    try {
        if (req.cookies['register']) {
            res.clearCookie('register')
        }
        if (req.cookies['login']) {
            res.clearCookie('login')
        }

        return res.status(200).json({ success: true, message: 'Logout Successful' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User Not Exist');
        }
        const token = crypto.generateToken(17);
        const resetPasswordTokenexpires = Date.now() + 1 * 60 * 60 * 1000
        user.resetPasswordToken = token
        user.resetPasswordExpiresAt = resetPasswordTokenexpires
        await user.save();
        await sendVerificationEmail(user.email, token)
        return res.status(200).json({ message: 'Reset Pssword Email Successfully sent', success: true, resetToken: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).send('ResetToken Expired Or not Provided');
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        user.password = hashedpassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save();
        await sendResetEmailSuccessful(user.email);
        return res.status(200).json({ success: true, message: 'Password Reset Successful' })


    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
}

const deleteUser=async(req,res)=>{
    try {
        const {userId}=req.userId;
        if(!userId){
            return res.status(401).send('userid not present')
        }
        const user=await User.findById(userId);
        const email=user.email
        const username=user.username
        if(!user){
            return res.status(404).send('user not present')
        }
        return res.status(200).send('user deleted successfully')
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:error.message});   
    }
}
// const getUsers=async(req,res)=>{
//     try {
//         const {userId} = req.userId
//         if(!userId){
//             return res.status(404).json({success:false,message:'User not found'})
//         }
//         const users = await User.find({ _id: { $ne: userId } }).select('_id username image');
//         return res.status(200).json({users})
        
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:error.message,success:false})
//     }
// }
module.exports = {
    Register,
    Login,
    Logout,
    forgotPassword,
    resetPassword,
    deleteUser,
    // getUsers
    // getCurrentUserImage
};
