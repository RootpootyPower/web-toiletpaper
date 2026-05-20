var icon;
var shows;
var current = -1;

function init() {
    let i = document.querySelector(".namebox img");
    shows = document.getElementsByClassName("show");
    if (i == null || shows == null) {
        console.error("either icon or shows list can't be found");
        return;
    }
    icon = i;

    // add onclick to each element in shows
    for (let i = 0; i < shows.length; i++) {
        let a = shows[i].firstChild;
        a.addEventListener("click", () => changeImage(i));
    }

    // get image number from params
    let params = new URLSearchParams(window.location.search);
    let img = params.get("img");
    if (img == null)
        changeImage(0);
    else
        changeImage(Number.parseInt(img));
}

function changeImage(show) {
    if (show == current)
        return;
    show = Math.max(0, Math.min(show, shows.length-1));

    // set currently selected to bold
    let currElement = shows[current];
    if (currElement != null)
        currElement.style.fontWeight = "";
    let newElement = shows[show];
    newElement.style.fontWeight = "bold";

    current = show;
    let url = window.location.origin + window.location.pathname + `?img=${current}`;
    history.replaceState(null, "", url);

    // <a img="..."> ... </a>
    icon.src = newElement.firstChild.getAttribute("img");
}

init();