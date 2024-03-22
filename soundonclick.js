var x = document.getElementById("sfxClick"); 

function playAudio() { 
  x.play(); 
  pause(1000);
  window.location = "/index.html";
}