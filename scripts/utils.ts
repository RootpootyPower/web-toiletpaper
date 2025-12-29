export function getCookie(n:string): string | null | undefined {
    let cookies = document.cookie.split("; ");
    for (let c of cookies) {
        let nv = c.split("=");
        if (nv[0] == n)
            return nv[1];
    }

    return null;
}

export function setCookie(n:string, v:string) {
    document.cookie = `${n}=${v}; path=/`;
}
export function setCookieExpiry(n:string, v:string, t:Date) {
    document.cookie = `${n}=${v}; path=/; expires=${t.toUTCString()}`;
}

// browser version stuff

type browserInfo = {
    os:string,
    browser:string,
    version:number
}

// referenced this website: https://explore.whatismybrowser.com/useragents/parse/
// thank you whatismybrowser.com
export function getBrowserInfo():browserInfo {
    let agent = navigator.userAgent;
    let os:string, browser:string, version:number;

    // yandev i wish there was a better way to do this
    // OK there technically is but it also sucks

    if (agent.includes("Windows"))
        os = "Windows" + agent.includes("NT") ? " NT" : " 9x";
    // iOS sometimes includes 'like Mac OS X' for some fucking reason so it has to be checked first
    else if (agent.includes("iPhone") || agent.includes("iPad"))
        os = "iOS";
    else if (agent.includes("OS X")) // still has the x, and mac isn't always there. inconsistent
        os = "Mac";
    else if (agent.includes("Android"))
        os = "Android";
    else if (agent.includes("Linux"))
        os = "Linux";
    else os = "Unknown"; // not exhaustive but whateverrrrrr

    // here is the 'better way'
    
    let list = ["MyPal","PaleMoon","Firefox","FxiOS","Edg","EdgiOS","Brave","Chrome","CriOS","Safari","Opera", "MSIE", "NintendoBrowser", "SamsungBrowser"];
    let s:number, found = false;
    // find browser string and cut off everything before it
    for (let i = 0; i < list.length; i++) {
        if ((s = agent.search(<string>list[i])) < 0) continue;
        found = true;
        agent = agent.substring(s);
        break;
    }

    // deal with names
    browser = agent.split("/")[0] ?? "Unknown";
    switch (browser) {
        case "FxiOS":
            browser = "Firefox"; break;
        case "Edg": // really, microsoft?
        case "EdgiOS":
            browser = "Edge"; break;
        case "CriOS":
            browser = "Chrome"; break;
    }
    
    // FUCK YOU!!!!! FUCK YOU!!!!!
    let splitChar = (browser == "MSIE") ? " " : "/";
    let v = agent.split(splitChar)[1];
    if (v == null || !found)
        return {os:os, browser:"Unknown", version:Number.NaN}; // not a natch

    // just ignore decimals who gaf
    v = v.substring(0,v.search(/\W/));

    return {os:os, browser:browser, version:Number.parseInt(v)};
}

export function checkAnimatedAvifSupport():boolean {
    // so it doesn't have to run the whole check every time you hover over something
    if (getCookie("aavif") != null) {
        return getCookie("aavif") == "true";
    }

    let info = getBrowserInfo(), s:boolean = false;

    switch (info.browser) {
        case "Firefox":
            s = info.version >= 113;
            break;
        case "Safari":
            s = info.version >= 17; // supported by 16.4 but idgaf
            break;
        case "Edge":
        case "Brave": // Probably
        case "Chrome":
            s = info.version >= 121;
            break;
        case "Opera":
            s = info.version >= 71;
            break;
        case "SamsungBrowser":
            s = info.version >= 14;
            break;
    }

    // shouldnt change often, so cookie lasts a year
    let nextYear = new Date(Date.now()+31536000000); // 365 days in ms. good enough
    setCookieExpiry("aavif", s.toString(), nextYear)

    return s;
}