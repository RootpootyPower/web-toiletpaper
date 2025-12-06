var input = <HTMLTextAreaElement>document.getElementById("input");
var output = <HTMLTextAreaElement>document.getElementById("output");

output.value = textToASCII(input);

input.onchange = () => {
    output.value = textToASCII(input);
}

output.onchange = () => {
    output.value = ASCIIToText(output);
}

function textToASCII(text:HTMLTextAreaElement): string {
    let o = "";

    for (let i = 0; i < text.value.length; i++) {
        o += text.value.charCodeAt(i);
        if (i < text.value.length-1) {
            o += " ";
        }
    }

    return o;
}

function ASCIIToText(ascii:HTMLTextAreaElement): string {
    let o = "";

    for (let c in ascii.value.split(" ")) {
        o += String.fromCharCode(Number.parseInt(c));
    }

    return o;
}