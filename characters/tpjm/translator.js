var input = document.getElementById("input");
var output = document.getElementById("output");

output.value = textToASCII(input.value);

input.onchange = function (data) {
    output.value = textToASCII(data.target.value);
}

output.onchange = function (data) {
    input.value = ASCIIToText(data.target.value);
}

function textToASCII(text) {
    var o = "";

    for (let i = 0; i < text.length; i++) {
        o += text.charCodeAt(i);
        if (i < text.length-1) {
            o += " ";
        }
    }

    return o;
}

function ASCIIToText(ascii) {
    return String.fromCharCode.apply(null, ascii.split(" "));
}