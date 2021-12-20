/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class HelpController {
    constructor() {
        this.help = false;
    }

    postConstruct() {
        this.mainController = inject("mainController");
    }

    prepareHelp() {
        this.help = true;
        update("#endpointEdit");
        update("#endpointsGrid");
        update("#menuBar");
        update("#helpPage");
    }
    
    close() {
        this.help = false;
        update("#endpointsGrid");
        update("#menuBar");
        update("#helpPage");
    }

    isHelp() {
        return this.help;
    }

    setHelp(help) {
        this.help = help;
    }

}
