const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;

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
                    req.flash('errors' ,'گزینه امنیتی مربوط به شناسایی ربات خالی است');
                    res.redirect(req.url);
                } else {
                    resolve(true);
                }
            })
        })
    }
}