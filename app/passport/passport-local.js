const passport = require('passport');
const user = require('../models/user');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });


  passport.use('local.register' , new localStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true 
    
  },
   (req, email, password, done) => {
      console.log(email, password);
        user.findOne({'email' : email }, (err, user) => {
            if(err){return done(err)} 
            else if(user) {return done(null, false, req.flash('errors', "این کاربر از قبل وجود دارد"))}
            
            const newUser = new User ({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });
            newUser.save(err => {
                if(err) return done(err, false, req.flash('errors', 'ثبت نام انجام نشد لطفا دوباره امتحان کنید'));
                done(null, newUser);
            });
        });
}));

passport.use('local.login' , new localStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true 

},
(req, email, password, done) => {
    user.findOne({'email' : email }, (err, user) => {
        if(err){return done(err)} 
        else if(! user || ! user.comparePassword(password)) {
          return done(null, false, req.flash('errors', 'اطلاعات وارد شده صحیح نیست'))

        }
        done(null, user);



    });
}));