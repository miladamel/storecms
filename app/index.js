const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const Helpers = require('./helpers');
const rememberLogin = require('./http/middleware/rememberLogin');
const config = require('../config');



module.exports = class Application {
    constructor() {
        this.setupExpress();
        this.setMongoConnection();
        this.setConfig();
        this.setRouters();
    }

    setupExpress() {
        const server = http.createServer(app);
        server.listen(process.env.APPLICATION_PORT , () => console.log(`Listening on port ${process.env.APPLICATION_PORT}`));
    }

    setMongoConnection() {
        mongoose.Promise = global.Promise;
        mongoose.connect(config.database.url);
    }

   
     // Express Config
     
    setConfig() {
        require('../app/passport/passport-local');
        app.use(express.static(config.layout.public_dir));
        app.set('view engine', config.layout.view_engine);
        app.set('views',config.layout.view_dir);
        app.use(config.layout.ejs.express);
        app.set("layout extractScripts", config.layout.ejs.extractScripts);
        app.set("layout extractStyles", config.layout.ejs.extractStyles);
        app.set('layout', config.layout.ejs.master);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended : true }));
        //app.use(validator());
        app.use(session({  
            ...config.session
        }));
        app.use(cookieParser(process.env.COOKIE_SECRETKEY));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session({}));
        app.use(rememberLogin.handle);
        app.use((req, res, next) => {
            app.locals = new Helpers(req, res).getObjects();
            next();           
        })
    }

    setRouters() {
        app.use(require('./routes/api'));
        app.use(require('./routes/web'));        
    }
}