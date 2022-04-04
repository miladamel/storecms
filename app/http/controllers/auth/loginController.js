const passport = require('passport');
const controller = require('./../controller');

class loginController extends controller {
    
    showLoginForm(req , res) {
        res.render('auth/login', {messages : req.flash('errors'), recaptcha : this.recaptcha.render()});
    }
    loginProccess(req, res, next) {
        this.recaptchaValidation(req , res)
        .then(result =>  this.validationData(req))
            .then(result => {
                if(result) this.login(req, res, next);
                else res.redirect(req.url);
            })
            .catch(err => console.log(err));
              
    }

    login(req, res, next) {
        passport.authenticate('local.login', (err, user) => {
            if(!user) return res.redirect('/login')

            req.logIn(user, err => {
                if(req.body.remember) {
                    user.setRememberToken(res);
                }

                return res.redirect('/');
            })
        })(req, res, next);
    }

}

module.exports = new loginController();