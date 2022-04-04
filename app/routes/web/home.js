const express = require('express');
const router = express.Router();

// Controllers
const homeController = require('../../http/controllers/homeController');
const loginController = require('../../http/controllers/auth/loginController');
const registerController = require('../../http/controllers/auth/registerController');

//Middle wares
const redirectIfAthenticated = require('../../http/middleware/redirectIfAthenticated');

//Validators
const registerValidator = require('./../../http/validators/registerValidator');
const loginValidator = require('./../../http/validators/loginValidator');

// Home Routes
router.get('/' , homeController.index);

router.get('/login' ,
 redirectIfAthenticated.handle,
  loginController.showLoginForm);

router.post('/login',
 redirectIfAthenticated.handle,
  loginValidator.handle(),
   loginController.loginProccess);

router.get('/register',
 redirectIfAthenticated.handle,
  registerController.showRegsitrationForm);

router.post('/register',
 redirectIfAthenticated.handle,
  registerValidator.handle(),
   registerController.registerProccess);

router.get('/logout', (req, res) => {
    res.clearCookie('remember_token');
    req.logout();
    res.redirect('/');
  });


module.exports = router;