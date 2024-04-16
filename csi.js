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
    if (getMuted()) {
        return response.replace("MUTECLASS", "on").replace("MUTETEXT", "Muted");
    } else {
        return response.replace("MUTECLASS", "off").replace("MUTETEXT", "Mute");
    }
}

// topnav audio
function fart() {
    if (getMuted()) { // muted
        return;
    }
    document.getElementById("sfxHover").play();
}

// button press
function muteButton() {
    var btn = document.getElementById("mute");

    if (!getMuted()) { // unset or false
        mute();
        btn.innerHTML = "Muted";
        btn.className = "on";
    } else { // true
        unmute();
        btn.innerHTML = "Mute";
        btn.className = "off";
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

  