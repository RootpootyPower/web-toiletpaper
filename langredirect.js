/* enable when there are any actual working localizations

let lang = window.navigator.languages ? window.navigator.languages[0] : null;
lang = lang || window.navigator.language || window.navigator.browserLanguage 
           || window.navigator.userLanguage;

let shortLang = lang;
if (shortLang.indexOf('-') !== -1)
shortLang = shortLang.split('-')[0];

if (shortLang.indexOf('_') !== -1)
shortLang = shortLang.split('_')[0];

var languages = ["de","ja","fr"];


for (let l of languages) {
    if (l == shortLang) {
        window.location.replace('/lang/' + shortLang + location.pathname);
    }
} */