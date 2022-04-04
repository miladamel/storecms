const autoBind = require('auto-bind');


module.exports = class request {
    constructor() {
        autoBind(this);
    }
}