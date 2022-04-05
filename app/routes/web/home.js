const express = require('express');
const router = express.Router();

//home controller
const homeController = require('../../http/controllers/homeController');


// Home Routes
router.get('/' , homeController.index); 

router.get('/logout', (req, res) => {
  res.clearCookie('remember_token');
  req.logout();
  res.redirect('/');
});


module.exports = router;