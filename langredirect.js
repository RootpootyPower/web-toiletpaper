let lang = window.navigator.languages ? window.navigator.languages[0] : null;
lang = lang || window.navigator.language || window.navigator.browserLanguage 
           || window.navigator.userLanguage;

let shortLang = lang;
if (shortLang.indexOf('-') !== -1)
shortLang = shortLang.split('-')[0];

if (shortLang.indexOf('_') !== -1)
shortLang = shortLang.split('_')[0];

var languages = ["de","ja","fr"];

// update with the following format when more localizations go live
for (let l of languages) {
    if (l == shortLang) {
        window.location.replace('/lang/' + shortLang + location.pathname);
    }
}


// dropdown stuff. so i dont have to add a new js file

//window.location.replace ('/lang/' + this.options[this.selectedIndex].value + window.location.href.substring(window.location.href.lastIndexOf('/')));

function changeLang(lang) {
    if (lang == "") return; // if on select a language

    var path = window.location.pathname;
    if (path.search("/lang/") == 0) {
        path = path.substring(8); // remove /lang/xx/
    }
    if (lang != "en") {
        history.pushState("penis", "");
        window.location.replace(`/lang/${lang}${path}`);
    } else {
        window.location.replace(path);
    }
  }