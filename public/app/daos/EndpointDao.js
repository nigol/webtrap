/*jshint esversion: 6 */

export class EndpointDao {
    constructor() {
        this.endpoints = {};
    }

    getAllEndpoints(onSuccess, onError) {
        fetch("/api/end", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((response) => response.json())
        .then(json => {
            const endp = [].concat.apply([], (Object.keys(json).map((a) => 
                Object.keys(json[a]).map((b) => 
                    json[a][b]))));
            this.endpoints = json;
            onSuccess(endp);
        })
        .catch((error) => {
            this.endpoints = {};
            onError([]);
        });

    }

    getEndpointPath(path) {
        return this.endpoints[path];
    }

    getEndpointPathMethod(path, method) {
        return this.endpoints[method][path];
    }

    removeEndpoint(path, method, onSuccess, onError) {
        const endpoint = this.endpoints[method][path];
        delete this.endpoints[method][path];
        fetch("/api/end", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(endpoint),
        })
        .then((response) => {
            onSuccess(endpoint);
        })
        .catch((error) => onError(endpoint));
    }

    addEndpoint(endpoint, onSuccess, onError) {
        if (this.endpoints[endpoint.method] === undefined) {
            this.endpoints[endpoint.method] = {};
        }
        this.endpoints[endpoint.method][endpoint.path] = endpoint;
        fetch("/api/end", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(endpoint),
        })
        .then((response) => {
            onSuccess(endpoint);
        })
        .catch((error) => onError(endpoint));
    }
}