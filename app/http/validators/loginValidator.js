const validator = require('./validator');
const { check, validationResult } = require('express-validator');

class loginValidator extends validator {

    handle() {
        return [

                check('email')
                .isEmail()
                .withMessage('email is not validated'),

                check('password')
                .not().isEmpty()
                .withMessage('password cant be empty')
                .isLength({ min : 8})
                .withMessage('password cant be less than 5 chars'),

          

                
        ]
    }
}

module.exports = new loginValidator();

