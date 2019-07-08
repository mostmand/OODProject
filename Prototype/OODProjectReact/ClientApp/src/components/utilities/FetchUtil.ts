import { CookieUtil } from "./CookieUtil";


export class FetchUtil {
    public static async fetchFromUrl(url: string): Promise<any> {
        var request: RequestInit = {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer" // no-referrer, *client
        };
        const response = await fetch(url, request);
        try {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public static async postToUrl(url: string, body: any): Promise<any> {
        const csrfToken = CookieUtil.getCookie('csrftoken') || '';

        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: "no-cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(body),
            redirect: "manual", // manual, *follow, error
            referrer: "no-referrer" // no-referrer, *client
        });

        try {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}