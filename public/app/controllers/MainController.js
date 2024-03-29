/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class MainController {
    constructor() {
        this.endpoints = [];
        this.allEndpoints = [];
        this.message = "Starting application.";
        this.filter = "";
    }

    postConstruct() {
    	this.endpointService = inject("endpointService");
    	this.editController = inject("editController");
    	this.requestService = inject("requestService");
        this.helpController = inject("helpController");
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
            this.allEndpoints = endpoints;
            this.endpoints = endpoints;
            update("#endpointsGrid");
        };
        const error = (endpoints) => {
            this.allEndpoints = endpoints;
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
            document.getElementById("requests").innerHTML = marked.parse(this.requestText);
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
    
    showHelp() {
        this.helpController.prepareHelp();
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

    onFilterChanged() {
        const event = window.event;
        this.filter = event.target.value;
        this.endpoints = this.allEndpoints.filter(endp => {
            return endp.path.startsWith(this.filter);
        });
        this.selectedEndpoint = undefined;
        update("#endpointDetailGrid");
        update("#endpointsGrid");
    }


    download() {
        window.open(window.location.href + "api/end", "_blank");
    }
}
