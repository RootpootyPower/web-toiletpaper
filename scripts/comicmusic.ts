function init() {
    let playBtn = document.getElementById("play");
    if (playBtn == null)
        throw new Error("No play button");

    // create autoplay audio element
    let music = document.createElement("audio");
    music.src = "/audio/music/xmasComic.mp3";
    music.loop = true;

    let playDiv = playBtn.parentElement;
    if (playDiv == null)
        throw new Error("Play button has no parent");

    playDiv.appendChild(music);
    music.play();

    // assign click function
    playBtn.addEventListener("click", () => press(playBtn, music));

    if (!music.paused) {
        playBtn.innerHTML = "Pause Music"
    }
}

function press(button:HTMLElement, music:HTMLAudioElement) {
    if (music.paused) { // start playing
        button.innerHTML = "Pause Music"
        music.play();
    } else { // stop (and restart)
        button.innerHTML = "Play Music"
        music.pause();
        music.currentTime = 0;
    }
}

try {
    init();
} catch (error:any) {
    if (error instanceof Error)
        console.error(error.message);
}