const express = require('express')
const router = express.Router();

const { registerUser, 
        forgotPassword, 
        getUserDetails, 
        getUserProfile, 
        updatePassword, 
        updateProfile,
        resetPassword,  
        updateUser, 
        deleteUser,
        loginUser, 
        allUsers,  
        logout, 
        verifyEmail } = require('../controllers/usersController')


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);

router.route('/logout').get(logout);

router.route('/me/:id').get(getUserProfile);
router.route('/password/update').put(updatePassword);

router.route('/me/update').put(updateProfile);

router.route('/users').get(allUsers);
router.route('/user/:id').get(getUserDetails);
router.route('/user/:id').put(updateUser);
router.route('/user/:id').delete(deleteUser);

router.route('/auth/verify-email/:token').get(verifyEmail);

module.exports = router;