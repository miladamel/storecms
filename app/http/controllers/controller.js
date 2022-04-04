const autoBind = require('auto-bind');
const Recaptcha = require('express-recaptcha').RecaptchaV2;

module.exports = class controller {
    constructor() {
        autoBind(this);
        this.recaptchaConfig();
    }
    recaptchaConfig() {
        this.recaptcha = new Recaptcha(
            '6LdPEqYeAAAAACPchlzaS4_Hw4I1ejhME1bnZaYl',
            '6LdPEqYeAAAAAHvDw-yx4adGbXkZ2nn97CnePZ17',
            { hl : 'fa' }
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