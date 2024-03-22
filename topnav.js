function myTopnav() {
  var x = document.getElementById("topnavdiv");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function newHome() {
  document.getElementById("homeicon").src="/images/icons/hover/home.png";
  var x = document.getElementById("sfxHover"); 
  x.play(); 
}

function oldHome() {
  document.getElementById("homeicon").src="/images/icons/home.png";
}

function newAbout() {
  document.getElementById("abouticon").src="/images/icons/hover/about.png";
  var x = document.getElementById("sfxHover"); 
  x.play();
}

function oldAbout() {
  document.getElementById("abouticon").src="/images/icons/about.png";
}

function newCharacters() {
  document.getElementById("charactersicon").src="/images/icons/hover/characters.png";
  var x = document.getElementById("sfxHover"); 
  x.play();
}

function oldCharacters() {
  document.getElementById("charactersicon").src="/images/icons/characters.png";
}

function newGames() {
  document.getElementById("gamesicon").src="/images/icons/hover/games.png";
  var x = document.getElementById("sfxHover"); 
  x.play();
}

function oldGames() {
  document.getElementById("gamesicon").src="/images/icons/games.png";
}

function newComics() {
  document.getElementById("comicsicon").src="/images/icons/hover/comics.png";
  var x = document.getElementById("sfxHover"); 
  x.play();
}

function oldComics() {
  document.getElementById("comicsicon").src="/images/icons/comics.png";
}

function newWatch() {
  document.getElementById("watchicon").src="/images/icons/hover/watch.png";
  var x = document.getElementById("sfxHover"); 
  x.play();
  
}

function oldWatch() {
  document.getElementById("watchicon").src="/images/icons/watch.png";
}