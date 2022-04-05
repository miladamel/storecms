const validator = require('./validator');
const { check } = require('express-validator');

class registerValidator extends validator {

    handle() {
        return [
            check('name')
                .not().isEmpty()
                .withMessage('فیلد نام نمیتواند خالی بماند')
                .isLength({ min : 2})
                .withMessage('نام نمیتواند کمتر از 2 کاراکتر باشد'),

                check('email')
                .not().isEmpty()
                .withMessage('فیلد ایمیل نمیتواند خالی باشد')
                .isEmail()
                .withMessage('ایمیل معتبر نیست'),

                check('password')
                .not().isEmpty()
                .withMessage('فیلد پسورد نمیتواند خالی باشد')
                .isLength({ min : 8})
                .withMessage('پسورد نمیتواند کمتر از 8 کاراکتر باشد'),

          

                
        ]
    }
}

module.exports = new registerValidator();

