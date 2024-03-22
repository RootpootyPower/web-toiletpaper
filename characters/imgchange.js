var icon = document.querySelector(".namebox img");
var shows = document.getElementsByClassName("show");
var current = shows.length-1;
shows[current].style.fontWeight = "bold";

function changeImage(show) {
    if (show == current) {
        return; // dont bother if currently displayed one is clicked
    }

    icon.src = shows[show].firstChild.getAttribute("img");
    shows[current].style.fontWeight = "";
    current = show;
    shows[current].style.fontWeight = "bold";
}