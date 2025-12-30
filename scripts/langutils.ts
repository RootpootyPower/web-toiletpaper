import * as Utils from "./utils.js"
import { loadFile } from "./loadFile.js"

export const supportedLangs = ["en","fr","tok"];

// return iso code
export function getBrowserLang():string {
    let lang = window.navigator.language;
    if (lang.length < 4) // just two- or three-letter code
        return lang;
    else
        return lang.substring(0,lang.indexOf('-'));
}
// current page language, from pathname
export function getPageLang():string {
    let path = window.location.pathname;
    if (path.search("/lang/") < 0)
        return "en";
    return path.split('/')[2] ?? "en";
}

// return currently set language. redirect to correct page if it isn't set
export function getLangAndRedirect():string {
    let lang = Utils.getCookie("lang");
    if (lang == null) {
        redirect(getBrowserLang());
    } else if (lang != "en") {
        redirect(lang);
    }
    return getPageLang();
}

// switches page language and sets cookie
export function redirect(lang:string) {
    if (lang == getPageLang())
        return;

    Utils.setCookie("lang",lang);

    history.pushState(null, ""); // save current page so you can go back if you want

    // remove language stuff from pathname and add it back if it's not english
    let pn = window.location.pathname.substring(1);
    if (getPageLang() != "en") {
        pn = pn.substring(6+getPageLang().length);
    } if (lang != "en")
        pn = `/lang/${lang}/${pn}`;

    window.location.href = window.location.origin + pn;
}

export function localize(loc:string, file:string) {
    let lang = getPageLang();
    if (lang == "en") return;

    // get file based on specified location and page language. alternating lines of id and
    // contents, so split them into two arrays
    loadFile(`/txt/${file}/${lang}.txt`, (r:string) => {
        let ids = [], text = [], split = r.split('\n');
        for (let i = 0; i < split.length; i++) {
            if (i % 2 == 0)
                ids.push(split[i]);
            else
                text.push(split[i]);
        }

        // queryselector for both the general location and the specific id
        let e;
        for (let i = 0; i < ids.length; i++) {
            if ((e=document.querySelector(`#${file} #${ids[i]}`)) != null)
                e.innerHTML = <string>text[i];
            console.log(e);
        }
    });
}

// special case to return mute button string
// probably gonna have to make this abstract in the future but it's fine for now
export async function getMuteString(str:string):Promise<string> {
    let lang = getPageLang();
    if (lang == "en") return "what are you doing";

    return await fetch(`/txt/mute/${lang}.txt`).then((r) => r.text())
        .then((r) => {
            let s = r.split('\n')[str == "on" ? 1 : 0];
            return s ?? str;
        });
}