// re-rewriting everything because NOTHING EVER WORKS!
// modules are convenient and nice until you start getting an inexplicable disallowed MIME type error after changing literally nothing whatsoever. also that way we're not able to use libgif which we'll need if we want to have stopping and starting gifs, so I need to move it back to regular javascript anyway. everything sucks forever
// goodbye import/export you will be missed
//.....hello massive single js file with every single function in it

function loadFile(source, handler) {
    if (source == null) {
        console.error("Invalid source: " + source);
        return;
    }

    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState != XMLHttpRequest.DONE)
            return;
        
        let response;
        if (req.status == 200 && (response = req.responseText))
            handler(response);
        else if (req.status == 404)
            handler("404");
        else
            console.error(`Error loading ${source}; status: ${req.status}`);
    }

    try {
        req.open("GET", source);
        req.send();
    } catch (e) {
        console.error(`Error: {e}`);
    }
}

const fartSounds = [];

window.onload = () => {
    // all include tags
    let includes = document.getElementsByTagName("include");
    
    for (let i of includes) {
        let source = i.getAttribute("data");
        if (source.includes("html"))
            loadFile(source, (r) => includeHandler(r, i));
    }

    // initialize fart sounds (c lydian pentatonic) (simpsons)
    for (let f of ["C", "E", "F_Sharp", "G", "A", "High_C"]) {
        let audio = document.createElement("audio");
        audio.src = `/audio/topnav/${f}.mp3`;
        fartSounds.push(audio);
    }
}

function includeHandler(data, element) {
    let d = element.getAttribute("data");
    if (d == null) return;

    element.outerHTML = data;

    switch (d.split(".")[0]) {
        case "/topnav":
            handleTopnav();
            break;
        case "/footer":
            handleFooter();
            localize("footer", "footer");
            break;
    }
}

function handleTopnav() {
    // add listeners to page links
    let list, links;
    if ((list = document.getElementById("navlinks")) == null
        || (links = list.children) == null) { 
        console.log("no topnav??");
        return;
    }
    
    for (let i = 0; i < links.length; i++) {
        let nav = links[i];
        let soup = new SuperGif({ gif: nav.children[1], show_progress_bar: false });
        // after loaded, add event listeners. unfortunately this takes forever but it's necesary
        // to wait or else the gifs will get fucked up
        soup.load(() => {
            let canvas = soup.get_canvas();
            nav.addEventListener("mouseover", () => {
                soup.play();
                nav.children[0].style.display = "none";
                nav.children[1].style.display = "block";
                fart(i);
            });
            nav.addEventListener("mouseout", () => {
                soup.pause();
                soup.move_to(0);
                nav.children[0].style.display = "block";
                nav.children[1].style.display = "none";
            });
            // set gifs to be hidden by default, as if unhovered
            nav.children[1].style.display = "none";
        });
    }

    // listeners for hamburger button. i dont remember why it's 'responsive' whatever
    let hamburger = document.getElementById("hamburger");
    if (hamburger != null)
        hamburger.addEventListener("click", () => {
            let topnav = hamburger.parentNode;
            topnav.className = topnav.className == "topnav" ? "topnav responsive" : "topnav";
        });
}

// play sound on hover
function fart(n) {
    if (getCookie("mute") == "true")
        return;
    fartSounds[n].play();
}

function handleFooter() {
    let mutebtn = document.getElementById("footermute");
    if (mutebtn == null) return;

    let mute = getCookie("mute");
    if (mute == "true") {
        mutebtn.className = "on";
        mutebtn.innerHTML = "Muted";
    } else {
        mutebtn.className = "off";
        mutebtn.innerHTML = "Mute";
        if (mute == null)
            setCookie("mute","false");
    }

    mutebtn.addEventListener("click", () => muteButton(mutebtn));

    // language dropdown
    let dropdown = document.getElementById("langdropdown");
    if (dropdown == null) return;
    // set selection to current language
    dropdown.value = getLangAndRedirect();

    dropdown.addEventListener("change", () => {
        let v = dropdown.value;
        if (v == "select" || supportedLangs.indexOf(v) < 0) return;
        redirect(v);
    });
}

// click event
async function muteButton(mutebtn) {
    let mute = getCookie("mute");
    if (mute == "true") {
        if (getPageLang() == "en")
            mutebtn.innerHTML = "Mute";
        else
            mutebtn.innerHTML = await getMuteString("off");

        mutebtn.className = "off";
        setCookie("mute","false");
    } else {
        if (getPageLang() == "en")
            mutebtn.innerHTML = "Muted";
        else
            mutebtn.innerHTML = await getMuteString("on");

        mutebtn.className = "on";
        setCookie("mute","true");
    }
}

// utils.ts
// cookie stuff, browser version

function getCookie(n) {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let nv = c.split("=");
        if (nv[0] == n)
            return nv[1];
    }
    return null;
}

function setCookie(n, v) {
    document.cookie = `${n}=${v}; path=/`;
}
function setCookieExpiry(n, v, t) {
    document.cookie = `${n}=${v}; path=/; expires=${t.toUTCString()}`;
}

//
// browser version stuff
//
// browser info is os, browser, version in that order

// referenced this website: https://explore.whatismybrowser.com/useragents/parse/
// thank you whatismybrowser.com
function getBrowserInfo() {
    let agent = navigator.userAgent;
    let os, browser, version;

    // yandev i wish there was a better way to do this
    // OK there technically is but it also sucks

    if (agent.includes("Windows"))
        os = "Windows" + agent.includes("NT") ? " NT" : " 9x";
    // iOS sometimes includes 'like Mac OS X' for some fucking reason so it has to be checked first
    else if (agent.includes("iPhone") || agent.includes("iPad"))
        os = "iOS";
    else if (agent.includes("OS X")) // still has the x, and mac isn't always there. inconsistent
        os = "Mac";
    else if (agent.includes("Android"))
        os = "Android";
    else if (agent.includes("Linux"))
        os = "Linux";
    else os = "Unknown"; // not exhaustive but whateverrrrrr

    // here is the 'better way'
    
    let list = ["MyPal","PaleMoon","Firefox","FxiOS","Edg","EdgiOS","Brave","Chrome","CriOS","Safari","Opera", "MSIE", "NintendoBrowser", "SamsungBrowser"];
    let s, found = false;
    // find browser string and cut off everything before it
    for (let i = 0; i < list.length; i++) {
        if ((s = agent.search(list[i])) < 0) continue;
        found = true;
        agent = agent.substring(s);
        break;
    }

    // deal with names
    browser = agent.split("/")[0];
    if (!browser) browser == "Unknown";
    switch (browser) {
        case "FxiOS":
            browser = "Firefox"; break;
        case "Edg": // really, microsoft?
        case "EdgiOS":
            browser = "Edge"; break;
        case "CriOS":
            browser = "Chrome"; break;
    }
    
    // FUCK YOU!!!!! FUCK YOU!!!!!
    let splitChar = (browser == "MSIE") ? " " : "/";
    let v = agent.split(splitChar)[1];
    if (v == null || !found)
        return {os:os, browser:"Unknown", version:Number.NaN}; // not a natch

    // just ignore decimals who gaf
    v = v.substring(0,v.search(/\W/));

    return {os:os, browser:browser, version:Number(v)};
}

function checkAnimatedAvifSupport() {
    // so it doesn't have to run the whole check every time you hover over something
    let a = getCookie("aavif");
    if (a != null)
        return a == "true";

    let info = getBrowserInfo(), s = false;

    switch (info.browser) {
        case "Firefox":
            s = info.version >= 113;
            break;
        case "Safari":
            s = info.version >= 17; // supported by 16.4 but idgaf
            break;
        case "Edge":
        case "Brave": // Probably
        case "Chrome":
            s = info.version >= 121;
            break;
        case "Opera":
            s = info.version >= 71;
            break;
        case "SamsungBrowser":
            s = info.version >= 14;
            break;
    }

    // shouldnt change often, so cookie lasts a year
    let nextYear = new Date(Date.now()+31536000000); // 365 days in ms. good enough
    setCookieExpiry("aavif", s.toString(), nextYear)

    return s;
}

// langutils.ts
// god help us all

const supportedLangs = ["en","fr","tok"];

// return iso code
function getBrowserLang() {
    let lang = window.navigator.language;
    if (lang.length < 4) // just two- or three-letter code
        return lang;
    else
        return lang.substring(0,lang.indexOf('-'));
}
// current page language, from pathname
function getPageLang() {
    let path = window.location.pathname;
    if (path.search("/lang/") < 0)
        return "en";
    let l = path.split('/')[2];
    return l ? l : "en"; // if null/undefined/empty
}

// return currently set language. redirect to correct page if it isn't set
function getLangAndRedirect() {
    let lang = getCookie("lang");
    if (lang == null) {
        redirect(getBrowserLang());
    } else if (lang != "en") {
        redirect(lang);
    }
    return getPageLang();
}

// switches page language and sets cookie
function redirect(lang) {
    if (lang == getPageLang())
        return;

    setCookie("lang",lang);

    history.pushState(null, ""); // save current page so you can go back if you want

    // remove language stuff from pathname and add it back if it's not english
    let pn = window.location.pathname;
    if (getPageLang() != "en") {
        pn = pn.substring(6+getPageLang().length);
    } if (lang != "en")
        pn = `/lang/${lang}${pn}`; // pn should include slash

    window.location.href = window.location.origin + pn;
}

function localize(loc, file) {
    let lang = getPageLang();
    if (lang == "en") return;

    // get file based on specified location and page language. alternating lines of id and
    // contents, so split them into two arrays
    loadFile(`/txt/${file}/${lang}.txt`, (r) => {
        let ids = [], text = [], split = r.split('\n');
        for (let i = 0; i < split.length; i++) {
            if (i % 2 == 0)
                ids.push(split[i]);
            else
                text.push(split[i]);
        }

        // queryselector for both the general location and the specific id
        let e;
        for (let i = 0; i < ids.length; i++) {
            if ((e=document.querySelector(`#${file} #${ids[i]}`)) != null)
                e.innerHTML = text[i];
        }
    });
}

// special case to return mute button string
// probably gonna have to make this abstract in the future but it's fine for now
async function getMuteString(str) {
    let lang = getPageLang();
    if (lang == "en") return "what are you doing";

    return await fetch(`/txt/mute/${lang}.txt`).then((r) => r.text())
        .then((r) => {
            let s = r.split('\n')[str == "on" ? 1 : 0];
            return s ? s : str;
        });
}