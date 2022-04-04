const user = require('../../../app/models/user');
const middleware = require('./middleware');



class redirectIfAthenticated extends middleware {
    handle(req, res, next) {
        if(req.isAuthenticated()) {
          return res.redirect('/');
        }
          next();
    

  



};

}

module.exports = new redirectIfAthenticated();