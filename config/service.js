
module.exports = {
    recaptcha : {
        client_key : process.env.RECAPTCHA_CLIENTKEY,
        site_key : process.env.RECAPTCHA_SITEKEY,
        options : {
            hl : 'fa'
        }
    },
    google : {
        client_key : process.env.GOOGLE_CLIENTKEY,
        site_key : process.env.GOOGLE_SITEKEY,
        callback_url : process.env.GOOGLE_CALLBACKURL
    }
}