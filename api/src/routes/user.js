const express = require('express');
const {
  createUser,
  updateUser,
  updateUserProfile,
  getSingleUser,
  signIn,
  logOut,
  googleUpdateProfile,
  passwordReset,
  forgotAndForcedResetPassword,
  activateAccount,
  googleSignIn,
  googleSignUp,
} = require('../controllers/user.js');
const {
  adminGetUsers,
  adminGetUser,
  adminUpdateUser,
  adminCreateUser,
} = require('../controllers/admin');
const { isAdmin, isLoggedIn } = require('../middleware/auth');

//Creating routes and adding the controllers.
const userRouter = express.Router();

//admin
userRouter.get('/admin/users', isLoggedIn, isAdmin, adminGetUsers);
userRouter.get('/admin/users/:id', isLoggedIn, isAdmin, adminGetUser);
userRouter.post('/admin/users', isLoggedIn, isAdmin, adminCreateUser);
userRouter.put('/admin/users', isLoggedIn,isAdmin, adminUpdateUser);

//user
userRouter.get('/auth/users', isLoggedIn, getSingleUser);
userRouter.put('/auth/users/profile', isLoggedIn, updateUserProfile);
userRouter.put('/auth/users/passwordReset', isLoggedIn, passwordReset);
userRouter.post('/auth/users/signup', createUser);
userRouter.delete('/auth/logOut', isLoggedIn, logOut);

//guest
userRouter.put('/submitPasswordReset/:id', forgotAndForcedResetPassword);

userRouter.post('/signIn', signIn);
userRouter.get('/activateAccount/:id', activateAccount);

//google
userRouter.post('/signInWithGoogle', googleSignIn);
userRouter.post('/signUpWithGoogle', googleSignUp);
userRouter.put('/updateGoogleProfile', isLoggedIn, googleUpdateProfile);

module.exports = userRouter;
