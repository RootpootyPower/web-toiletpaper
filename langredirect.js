let lang = window.navigator.languages ? window.navigator.languages[0] : null;
lang = lang || window.navigator.language || window.navigator.browserLanguage 
           || window.navigator.userLanguage;

let shortLang = lang;
if (shortLang.indexOf('-') !== -1)
shortLang = shortLang.split('-')[0];

if (shortLang.indexOf('_') !== -1)
shortLang = shortLang.split('_')[0];

// update with the following format when more localizations go live
// if(shortLang == 'de' || shortLang == 'ja')
//window.location.replace('./lang/' + shortLang + '/index.html');