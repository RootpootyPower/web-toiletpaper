// HEAVILY references csi.js by LexmarkWeb but with some tweaks for readability and
// our specific use case
// original at /oldcsi.js

window.onload = function() {
    var include = document.getElementsByTagName("include"); // <include data="source"></include>

    for (let i = 0; i < include.length; i++) {
        // i dont know why this has to be a function, but if it isn't it only loads one of them lol
        get(include[i], include[i].getAttribute("data"));
    }

    function get(location, source) {
        var data = new XMLHttpRequest();

        data.onreadystatechange = function() {
            if (data.readyState == 4) { // ready
                if (data.status != 200 || !data.responseText) { // not success or nothing as response
                    console.log(`Status ${data.status}`);
                    return;
                }

                var response = data.responseText;
                if (source.search("/footer.html") >= 0) { // change mute button based on status
                    response = muteText(response);
                }

                location.outerHTML = response;
                if (source.search("/footer.html") >= 0) { // AAAAAAAAAAAAAAAAAAAAAAAAA
                    localizeFooter();
                }
            }
        }

        try {
            data.open("GET", source);
            data.send();
        } catch (err) {
            console.log("Error:\n" + err);
        }
    }
}

// intercept mute button text
function muteText(response) {
    var shortLang = getLang();

    if (false) {
        // im not figuring this out right now.
    } else {
        if (getMuted()) {
            return response.replace("MUTECLASS", "on").replace("MUTETEXT", "Muted");
        } else {
            return response.replace("MUTECLASS", "off").replace("MUTETEXT", "Mute");
        }
    }
}

// initialize fart sounds (c lydian pentatonic scale)
var C = new Audio("/audio/topnav/C.mp3");
var E = new Audio("/audio/topnav/E.mp3");
var Fsharp = new Audio("/audio/topnav/F_sharp.mp3");
var G = new Audio("/audio/topnav/G.mp3");
var A = new Audio("/audio/topnav/A.mp3");
var C2 = new Audio("/audio/topnav/high_C.mp3");

// topnav audio, with different notes
function fart(note) {
    if (getMuted()) return;

    switch(note) {
        case 'C':
            C.play();
            break;
        case 'E':
            E.play();
            break;
        case 'F#':
            Fsharp.play();
            break;
        case 'G':
            G.play();
            break;
        case 'A':
            A.play();
            break;
        case 'C2':
            C2.play();
            break;
    }
}

// button press
function muteButton() {
    var btn = document.getElementById("mute");

    if (!getMuted()) { // unset or false
        mute();
        btn.className = "on";

        var shortLang = getLang();
        if (shortLang != null) {
            fetch(`/txt/footer/mute/${shortLang}.txt`)
            .then((response) => response.text())
            .then((data) => {
                btn.innerHTML = data.split("\n")[1];
            });
            return;
        }

        btn.innerHTML = "Muted";
    } else { // true
        unmute();
        btn.className = "off";

        var shortLang = getLang();
        if (shortLang != null) {
            fetch(`/txt/footer/mute/${shortLang}.txt`)
            .then((response) => response.text())
            .then((data) => {
                btn.innerHTML = data.split("\n")[0];
            });
            return;
        }

        btn.innerHTML = "Mute";
    }
}

// I HATE COOKIES!!!
function getMuted() {
    var c = document.cookie.split("; ");
    var cookies = {};
    var mutecookie;
    for (let i = 0; i < c.length; i++) {
        cookies[i] = c[i].split("=");
        if (cookies[i][0] == "mute") mutecookie = i;
    }

    return (mutecookie != undefined) && cookies[mutecookie][1] == "true";
}

function mute() {
    document.cookie = "mute=true; path=/";
}

function unmute() {
    document.cookie = "mute=false; path=/";
}

// topnav thing
function myTopnav() {
    var x = document.getElementById("topnavdiv");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// topnav icon switching

// the Date.now() following a question mark and the end of the animated icon URLs
// allows them to start at frame 1 as opposed to resuming from whatever position 
// they're at in the background
let agent = navigator.userAgent;

function charactersOff() {
    document.getElementById('charactersAVIF').srcset ='/images/icons/characters.avif';
    document.getElementById('charactersFB').src ='/images/icons/characters.png';
}

function charactersHover() {
    if((agent.indexOf("Firefox/")) && (agent.substring(agent.indexOf("rv:")+3,agent.indexOf("rv:")+6) < 113)) { // check for animated AVIF incompatible Firefox versions
        // force fallback
        document.getElementById('charactersAVIF').srcset ='/images/icons/hover/characters.gif?' + Date.now();
    } else {
        // use AVIF
        document.getElementById('charactersAVIF').srcset ='/images/icons/hover/characters.avif?' + Date.now();   
    }
    document.getElementById('charactersFB').src ='/images/icons/hover/characters.gif?' + Date.now();
}

// locale shit begins here. i wish there was a better way to do this
function getLang() {
    var path = window.location.pathname;

    // filter out english or no localization
    if (path.search("lang") == -1 || path.search("/en/") != -1) {
        return null;
    }

    return (path.split("/"))[2];
}


function localizeFooter() {
    // god
    shortLang = getLang();
    if (shortLang == null) {
        return;
    }

    fetch(`/txt/footer/${shortLang}.txt`)
    .then((response) => {
        if (!response.ok) { // error
            throw new Error("Error 1337: no localization lol fuck you");
        } else {
            return response.text();
        }
    })
    .then((data) => replaceText(data))
    .catch((err) => {
        var error = document.createElement("p");
        error.innerHTML = err.message;
        var footer = document.getElementById("footer");
        footer.insertBefore(error, footer.firstChild);
    });

    function replaceText(data) {
        var lines = data.split("\n");

        var ids = ["shitlinks", "copyright", "licencing", "contents"];

        for (let i = 0; i < ids.length; i++) {
            document.querySelector("#footer #" + ids[i]).innerHTML = lines[i];
        }
    }
}