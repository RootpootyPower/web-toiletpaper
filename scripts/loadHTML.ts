// get file contents and pass it to handler
export function loadHTML(source:string|null, handler:Function) {
    if (source == null || !source.includes(".html")) {
        console.error("Invalid source: " + source);
        return;
    }

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState != XMLHttpRequest.DONE)
            return;
        
        let response:string;
        if (req.status == 200 && (response = req.responseText))
            handler(response);
        else
            console.error(`Error loading ${source}; status: ${req.status}`);
    }

    try {
        req.open("GET", source);
        req.send();
    } catch (e) {
        console.error(`Error: {e}`);
    }
}