require('app-module-path').addPath(__dirname + '/app')
const App = require('./app');
require('dotenv').config();
global.config = require('./config');


new App();