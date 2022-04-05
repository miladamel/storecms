const validator = require('./validator');
const { check, validationResult } = require('express-validator');

class loginValidator extends validator {

    handle() {
        return [

                check('email')
                .isEmail()
                .withMessage('فیلد ایمیل خالی است'),

                check('password')
                .not().isEmpty()
                .withMessage('پسورد خود را وارد کنید')
   

                
        ]
    }
}

module.exports = new loginValidator();

