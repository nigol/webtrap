/*jshint esversion: 6 */

export class RequestDao {
    constructor() {
    }

    getRequestMethodPath(method, path, onSuccess, onError) {
        fetch(`/api/req/${method}/${path}`, {
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