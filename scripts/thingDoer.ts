// handles everything csi.js used to. import things because that's like. infinitely more
// manageable than one several hundred line long javascript file

import { loadHTML } from "./loadHTML.js"
import * as Utils from "./utils.js"

const fartSounds:HTMLAudioElement[] = [];

window.onload = () => {
    // all include tags
    let includes = <HTMLCollectionOf<HTMLElement>>document.getElementsByTagName("include");
    
    for (let i of includes) {
        let source = i.getAttribute("data");
        
        loadHTML(source, (r:string) => includeHandler(r, i));
    }

    // initialize fart sounds (c lydian pentatonic) (simpsons)
    for (let f of ["C", "E", "F_Sharp", "G", "A", "High_C"])
        fartSounds.push(new Audio(`/audio/topnav/${f}.mp3`));
}

function includeHandler(data:string, element:HTMLElement) {
    let d:string|null = element.getAttribute("data");
    if (d == null) return;

    element.outerHTML = data;
    console.log(d);

    switch (d.split(".")[0]) {
        case "/topnav":
            handleTopnav(); break;
        case "/footer":
            handleFooter(); break;
    }
}

function hover(nav:Element, i:number) {
    let name = nav.getAttribute("name");
    let fb = <HTMLImageElement>nav.children[1], avif = <HTMLSourceElement>nav.children[0];
    fb.src = `/images/icons/hover/${name}.gif`;
    avif.srcset = Utils.checkAnimatedAvifSupport() ? 
        `/images/icons/hover/${name}.avif?${Date.now()}` : this.children[1].src;
    fart(i);
}
function unhover(nav:Element) {
    let name = nav.getAttribute("name");
    let fb = <HTMLImageElement>nav.children[1], avif = <HTMLSourceElement>nav.children[0];
    fb.src = `/images/icons/${name}.png`;
    avif.srcset = `/images/icons/${name}.avif`;
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
        let firstChild = links[i]?.children[0]; // picture element
        
        if (firstChild == null || firstChild.tagName.toLowerCase() != "picture") 
            continue;
        console.log(firstChild);
        
        firstChild.addEventListener("mouseout", () => unhover(firstChild));
        firstChild.addEventListener("mouseover", () => hover(firstChild, i));
    }

    // listeners for hamburger button. i dont remember why it's 'responsive' whatever
    let hamburger = document.getElementById("hamburger");
    if (hamburger != null)
        hamburger.addEventListener("click", () => {
            let topnav = <HTMLElement>hamburger.parentNode;
            topnav.className = topnav.className == "topnav" ? "topnav responsive" : "topnav";
        });
}

// play sound on hover
function fart(n:number) {
    if (Utils.getCookie("mute") == "true")
        return;
    fartSounds[n]?.play();
}

function handleFooter() {
    console.log("AA");
    let mutebtn = document.getElementById("footermute");
    if (mutebtn == null) return;

    let mute = Utils.getCookie("mute");
    if (mute == "true") {
        mutebtn.className = "on";
        mutebtn.innerHTML = "Muted";
    } else {
        mutebtn.className = "off";
        mutebtn.innerHTML = "Mute";
        if (mute == null)
            Utils.setCookie("mute","false");
    }

    mutebtn.addEventListener("click", () => muteButton(mutebtn));
}

function muteButton(mutebtn:HTMLElement) {
    console.log(mutebtn);
    let mute = Utils.getCookie("mute");
    if (mute == "true") {
        mutebtn.className = "off";
        mutebtn.innerHTML = "Mute";
        Utils.setCookie("mute","false");
    } else {
        mutebtn.className = "on";
        mutebtn.innerHTML = "Muted";
        Utils.setCookie("mute","true");
    }
}


// probably change how this works entirely:

// intercept mute button text
function changeMuteText(response:string) {
    if (Utils.getCookie("mute") == "false") {
        return response.replace("MUTECLASS", "on").replace("MUTETEXT", "Muted");
    } else {
        return response.replace("MUTECLASS", "off").replace("MUTETEXT", "Mute");
    }
}