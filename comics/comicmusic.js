var playbtn = document.getElementById("play");

// create autoplay audio element
var music = document.createElement("audio");
music.src = "/audio/music/xmasComic.mp3";
music.loop = "true";
playbtn.parentElement.appendChild(music);

music.play();

if (!music.paused) {
    playbtn.innerHTML = "Pause Music"
}

function press() {
    if (music.paused) { // start playing
        playbtn.innerHTML = "Pause Music"
        music.play();
    } else { // stop (and restart)
        playbtn.innerHTML = "Play Music"
        music.pause();
        music.currentTime = 0;
    }
}