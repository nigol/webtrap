/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class EndpointService {
    constructor() {
    }

    postConstruct() {
        this.endpointDao = inject("endpointDao");
    }

    getAllEndpoints(onSuccess, onError) {
        this.endpointDao.getAllEndpoints(onSuccess, onError);
    }

    getEndpoint(path, method, callback) {
        callback(this.endpointDao.getEndpointPathMethod(path, method));
    }

    removeEndpoint(path, method, onSuccess, onError) {
        this.endpointDao.removeEndpoint(path, method, onSuccess, onError);
    }

    addEndpoint(endpoint, onSuccess, onError) {
        this.endpointDao.addEndpoint(endpoint, onSuccess, onError);
    }
}