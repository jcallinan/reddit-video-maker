const fetch = require("node-fetch")

const translate = async (text, lang) => {
    const details = {
        text,
        auth_key: process.env.DEEPL_KEY,
        target_lang: lang,
        tag_handling: "xml",
        preserve_formatting: "1",
    }

    const res = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "User-Agent": "Reddit Video Maker",
        },
        body: new URLSearchParams(details).toString(),
    }).then((r) => r.json())

    return res.translations
}

module.exports.translateText = function translateText(text, lang) {
    return translate(text, lang).then((translations) => translations[0].text)
}
