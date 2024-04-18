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
        fetch(`/txt/not found/${shortLang}.txt`)
        .then((response) => response.text())
        .then((data) => replaceText(data));
        break;
    }
}

function replaceText(data) {
    var lines = data.split("\n");
    document.title = lines[0];
    document.getElementById("title").innerHTML = lines[0];
    document.getElementById("main").innerHTML = lines[1];
    document.getElementById("copyright").innerHTML = lines[2];
}