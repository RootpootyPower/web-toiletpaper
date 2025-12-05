// global variable stuff
var current:number = 1;

var gallery:HTMLElement | null;
var parent:HTMLElement | null; // parent of gallery
var length:number;

var input1:HTMLInputElement;
var input2:HTMLInputElement;

init();

function init() {
    // get gallery element and its parent
    gallery = document.getElementById("comics");
    if (gallery == null) {
        console.error("No gallery lmao");
        return;
    }
    parent = gallery.parentElement;
    if (parent == null) {
        console.error("can't get gallery parent");
        return;
    }
    
    // only actually add controls if there's more than one page
    length = gallery.children.length;
    if (length <= 1) {
        console.log("one (or fewer) images so no gallery okay? okay?? thank you");
        return;
    }

    // set all but the first to be hidden
    for (let i = 1; i < length; i++) {
        let img = <HTMLElement>gallery.children.item(i);
        img.style.display = "none";
    }

    // create controls
    let controls1 = createControl();
    let controls2 = createControl();
    
    // add before and after gallery
    parent.insertBefore(controls1, gallery);
    parent.appendChild(controls2);
    // get controls' number inputs
    input1 = <HTMLInputElement>controls1.children[1];
    input2 = <HTMLInputElement>controls2.children[1];

    // arrow keys (global)
    document.addEventListener("keydown", (e) => {
        if (e.key == "ArrowLeft") {
            back();
        }
        if (e.key == "ArrowRight") {
            forward();
        }
    });
}

// i have to kill myself
function createControl():HTMLElement {
    var controls = document.createElement("div");
    controls.id = "controls";
    controls.className = "controls";
    
    let div1, div2, b1, b2, b3, b4, input1;
    div1 = document.createElement("div");
    div1.appendChild(b1 = document.createElement("button"));
    b1.appendChild(document.createTextNode("«"));
    div1.appendChild(b2 = document.createElement("button"));
    b2.appendChild(document.createTextNode("back"));

    input1 = document.createElement("input");
    input1.type = "number";
    input1.min = "1";
    input1.max = `${length}`;
    input1.value = "1";

    div2 = document.createElement("div");
    div2.appendChild(b3 = document.createElement("button"));
    b3.appendChild(document.createTextNode("next"));
    div2.appendChild(b4 = document.createElement("button"));
    b4.appendChild(document.createTextNode("»"));
    // onclick
    b1.addEventListener("click", () => first());
    b2.addEventListener("click", () => back());
    b3.addEventListener("click", () => forward());
    b4.addEventListener("click", () => last());
    // enter key
    input1.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            if (input1 == null) return;

            var val = Number.parseInt(input1.value);
            
            if (val > 0 && val <= length)
                changeImage(val);
        }
    });

    controls.append(div1, input1, div2);

    return controls;
}

function back() {
    changeImage(current-1);
}

function forward() {
    changeImage(current+1);
}

function first() {
    changeImage(1);
}

function last() {
    changeImage(length);
}

function changeImage(image:number) {
    if (image < 1 || image > length)
        return;

    // get current and new image elements. current and image aren't zero indexed so fix that
    let currentImg = <HTMLElement>gallery?.children.item(current-1);
    if (currentImg == null) {
        console.error("current image not found!");
        return;
    }
    let newImg = <HTMLElement>gallery?.children.item(image-1);
    if (newImg == null) {
        console.error("new image not found!");
        return;
    }
    
    currentImg.style.display = "none";
    newImg.style.display = "block";

    current = image;
    input1.value = current.toString();
    input2.value = current.toString();
}