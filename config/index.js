const database = require('./database');
const session = require('./session');
const layout = require('./layout');
const service = require('./service');


module.exports = {
    database,
    session,
    port : process.env.APPLICATION_PORT ,
    layout,
    service
}