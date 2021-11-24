/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class MainController {
    constructor() {
        this.endpoints = [];
        this.message = "Starting application.";
    }

    postConstruct() {
    	this.endpointService = inject("endpointService");
    	this.editController = inject("editController");
    	this.requestService = inject("requestService");
    }
    
    newEndpoint() {
        this.selectedEndpoint = this.editController.getEndpoint();
        this.editController.prepareEdit(() => {
            this.selectedEndpoint = undefined;
            this.refreshEndpointsData();
        });
    }

    removeEndpoint(path, method) {
        const event = window.event;
        const success = (endpoint) => {
            this.message = `Endpoint ${endpoint.method} ${endpoint.path} was removed.`;
            update("#message");
            this.refreshEndpointsData();
        };
        const error = (endpoint) => {
            this.message = `Error removing ${endpoint.method} ${endpoint.path} endpoint.`;
            update("#message");
            this.refreshEndpointsData();
        };
        this.endpointService.removeEndpoint(path, method, success, error);
        event.stopPropagation();
    }

    refreshEndpointsData() {
        const success = (endpoints) => {
            this.endpoints = endpoints;
            update("#endpointsGrid");
        };
        const error = (endpoints) => {
            this.endpoints = endpoints;
            update("endpointsGrid");
        };
        this.endpointService.getAllEndpoints(success, error);
    }

    getEndpoints() {
        return this.endpoints;
    }

    getEndpoint(path, method) {
        const event = window.event;
        this.endpointService.getEndpoint(path, method, (endpoint) => {
            this.selectedEndpoint = endpoint;
            update("#endpointDetailGrid");
            update("#endpointsGrid");
            update("#menuBar");
        });
        const success = text => {
            this.requestText = text;
            update("#endpointDetailGrid");
        };
        const error = text => {
            this.requestText = text;
            this.message = "Error loading request data.";
            update("#endpointDetailGrid");
            update("#message");
        };
        this.requestService.getRequestMethodPath(method, path, success, error);
        event.stopPropagation();
    }

    getSelectedEndpoint() {
        return this.selectedEndpoint;
    }

    closeDetail() {
        this.selectedEndpoint = undefined;
        update("#endpointDetailGrid");
        update("#endpointsGrid");
        update("#menuBar");
    }

    updateSelectedEndpoint() {
        const event = window.event;
        this.selectedEndpoint.response = event.target.value;
        const success = (endpoint) => {
        };
        const error = (endpoint) => {
            this.message = `Error saving ${endpoint.method} ${endpoint.path}.`;
            update("#message");
        };
        this.endpointService.addEndpoint(this.selectedEndpoint, success, error);
    }
}
