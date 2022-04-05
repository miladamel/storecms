const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;
const { check, validationResult } = require('express-validator');


module.exports = class controller {
    constructor() {
        autoBind(this);
        this.recaptchaConfig();
    }
    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            process.env.RECAPTCHA_SITEKEY ,
            process.env.RECAPTCHA_CLIENTKEY,
            { ...config.service.recaptcha.options} 
            );

    }
    recaptchaValidation(req, res) {
        return new Promise((resolve, reject) => {
            this.recaptcha.verify(req, (err, data) => {
                if(err) {
                    console.log(req.originalUrl)
                    req.flash('errors' ,'گزینه امنیتی مربوط به شناسایی ربات خالی است');
                    res.redirect(req.originalUrl);
                } else {
                    resolve(true);
                }
            })
        })
    }
    async validationData(req) {
        const result = validationResult(req)
        if(! result.isEmpty()){
            const errors = result.array();
            const messages = [];
            errors.forEach(err => messages.push(err.msg));

            if(errors.length == 0) 
                return true;
            
            req.flash('errors' , messages);
            return false;
        }
        
        return true;
    }
}