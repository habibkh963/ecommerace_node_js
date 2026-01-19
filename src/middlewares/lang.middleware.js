const en = require("../locales/en");
const ar = require("../locales/ar");

module.exports = (req, res, next) => {
    const langHeader = req.headers["accept-language"];

    let lang = "en";
    if (langHeader && langHeader.startsWith("ar")) {
        lang = "ar";
    }

    req.lang = lang;
    req.t = lang === "ar" ? ar : en;

    next();
};
