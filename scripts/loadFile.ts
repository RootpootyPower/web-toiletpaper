// get file contents and pass it to handler
export function loadFile(source:string|null, handler:Function) {
    if (source == null) {
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
        else if (req.status == 404)
            handler("404");
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