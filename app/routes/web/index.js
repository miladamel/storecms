const express = require('express');
const router = express.Router();

// Admin Router
const adminRouter = require('./admin');
router.use('/admin' , adminRouter);

// Home Router
const homeRouter = require('./home');
router.use('/' , homeRouter);

//Middle wares
const redirectIfAthenticated = require('../../http/middleware/redirectIfAthenticated');
const authRouter = require('./auth');
router.use('/', redirectIfAthenticated.handle, authRouter);

module.exports = router;