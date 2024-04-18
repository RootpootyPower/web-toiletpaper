var gallery = document.getElementById("comics");
var controls = document.getElementById("controls");
var controls2 = controls.cloneNode(true);
controls2.id = "controls2";
document.getElementById("maincontent").appendChild(controls2);
var input = document.querySelector("#controls #numinput");
var input2 = document.querySelector("#controls2 #numinput");

changeImage(1); // initialize it on first page

// change image on enter
input.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        changeImage(input.value);
    }
});
input2.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        changeImage(input2.value);
    }
});

// arrow keys
document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        back();
    }
    if (e.key == "ArrowRight") {
        forward();
    }
});

var current;

function changeImage(image) {
    current = image; // NOT zero indexed
    input.value = current;
    input2.value = current;

    // go through all but selected and hide them
    let len = gallery.children.length;

    for (let i = 0; i < len; i++) {
        // MAKE IT ZERO INDEXED
        let show = i == image-1 ? "block" : "none";
        gallery.children.item(i).style.display = show;
    }
}

function back() {
    if (current-1 < 1) {
        return;
    }
    changeImage(current-1);
}

function forward() {
    if (current+1 > input.max) {
        return;
    }
    changeImage(current+1);
}

function first() {
    changeImage(1);
}

function last() {
    changeImage(input.max);
}