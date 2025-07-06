function changeLang(lang) {
    if (lang == "") return; // if on select a language

    var path = window.location.pathname;
    if (path.search("/lang/") == 0) {
        path = path.substring(6 + path.split("/")[2].length); // remove /lang/xx_/
    }
    if (lang != "en") {
        history.pushState("penis", "");
        window.location.replace(`/lang/${lang}${path}`);
    } else {
        window.location.replace(path);
    }
  }