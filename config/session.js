const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


module.exports = {
    secret : 'mysecretkey',
            resave : true,
            saveUninitialized : true,
            cookie : {expires : new Date(Date.now() + 1000 * 60 * 1)},
            store : new MongoStore({ mongooseConnection : mongoose.connection })
}