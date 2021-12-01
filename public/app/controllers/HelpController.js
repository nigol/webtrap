/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class HelpController {
    constructor() {
        this.help = false;
    }

    postConstruct() {
        this.mainController = inject("mainController");
    }

    prepareHelp(onClose) {
        this.onClose = onClose;
        this.edit = true;
        update("#endpointEdit");
        update("#endpointsGrid");
        update("#menuBar");
    }

    isHelp() {
        return this.edit;
    }

    setHelp(help) {
        this.help = help;
    }

}
