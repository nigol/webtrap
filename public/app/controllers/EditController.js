/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class EditController {
    constructor() {
        this.edit = false;
        this.endpoint = {method: "GET"};
        this.formValid = false;
    }

    postConstruct() {
        this.endpointService = inject("endpointService");
        this.mainController = inject("mainController");
    }

    onMethodChanged() {
        const event = window.event;
        this.endpoint.method = event.target.value;
        this.validateForm();
    }

    onPathChanged() {
        const event = window.event;
        this.endpoint.path = event.target.value;
        this.validateForm();
    }

    onResponseCodeChanged() {
        const event = window.event;
        this.endpoint.responseCode = event.target.value;
        this.validateForm();
    }

    onResponseChanged() {
        const event = window.event;
        this.endpoint.response = event.target.value;
        this.validateForm();
    }

    validateForm() {
        this.formValid = this.endpoint.method !== undefined;
        this.formValid = this.formValid && this.endpoint.path !== undefined && this.endpoint.path !== "";
        this.formValid = this.formValid && this.endpoint.responseCode !== undefined && this.endpoint.responseCode !== "";
        update("#saveButton");
    }

    save() {
        const success = (endpoint) => {
            this.mainController.message = `Endpoint ${endpoint.method} ${endpoint.path} was saved.`;
            update("#message");
        };
        const error = (endpoint) => {
            this.mainController.message = `Error saving ${endpoint.method} ${endpoint.path}.`;
            update("#message");
        };
        this.endpointService.addEndpoint(this.endpoint, success, error);
        this.cancel();
    }

    prepareEdit(onClose) {
        this.onClose = onClose;
        this.edit = true;
        this.endpoint = {method: "GET"};
        update("#endpointEdit");
        update("#saveButton");
        update("#endpointsGrid");
        update("#menuBar");
    }

    cancel() {
        this.edit = false;
        this.formValid = false;
        this.endpoint = {};
        this.onClose();
        update("#endpointEdit");
        update("#endpointsGrid");
        update("#menuBar");
    }

    getEndpoint() {
        return this.endpoint;
    }

    isEdit() {
        return this.edit;
    }

    setEdit(edit) {
        this.edit = edit;
    }

}