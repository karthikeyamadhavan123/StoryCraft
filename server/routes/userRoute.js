const express = require('express');
const router = express.Router();
const ExistingUser = require('../middleware/Register.js');
const registerController = require('../controllers/userController.js');

const tokenVerification=require('../Verification/tokenVerification.js')
// Route for registration with file upload

router.post('/register',ExistingUser.existingUser,registerController.Register)
router.post('/login', registerController.Login);
router.post('/logout',tokenVerification, registerController.Logout);
router.post('/forgot-password', registerController.forgotPassword);
router.post('/reset-password/:token',registerController.resetPassword);
router.delete('/delete',tokenVerification,registerController.deleteUser);
// router.get('/users',tokenVerification,registerController.getUsers)
// router.get('/:userId/image',tokenVerification,registerController.getCurrentUserImage);

module.exports = router;