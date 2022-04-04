const validator = require('./validator');
const { check, validationResult } = require('express-validator');

class registerValidator extends validator {

    handle() {
        return [
            check('name')
                .not().isEmpty()
                .withMessage('name cant be empty')
                .isLength({ min : 5})
                .withMessage('name cant be less than 5 chars'),

                check('email')
                .not().isEmpty()
                .withMessage('Email cant be empty')
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

module.exports = new registerValidator();

