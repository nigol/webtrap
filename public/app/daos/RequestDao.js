/*jshint esversion: 6 */

export class RequestDao {
    constructor() {
        this.baseUrl = window.location.href;
    }

    getRequestMethodPath(method, path, onSuccess, onError) {
        fetch(this.baseUrl + `api/req/${method}/${path}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => response.text())
        .then(text => onSuccess(text))
        .catch((error) => onError(""));
    }
}
