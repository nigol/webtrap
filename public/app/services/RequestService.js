/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class RequestService {
    constructor() {
    }

    postConstruct() {
        this.requestDao = inject("requestDao");
    }

    getRequestMethodPath(method, path, onSuccess, onError) {
        this.requestDao.getRequestMethodPath(method, path, onSuccess, onError);
    }
}