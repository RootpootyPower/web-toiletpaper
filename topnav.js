function myTopnav() {
  var x = document.getElementById("topnavdiv");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}