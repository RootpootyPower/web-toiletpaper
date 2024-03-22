let text = document.getElementById("dropdown").innerHTML; 
let result = text.replace(/index/gi, "about.index");
document.getElementById("dropdown").innerHTML = result;