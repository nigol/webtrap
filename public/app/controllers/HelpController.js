/*jshint esversion: 6 */

import {inject} from "../instances.js";

export class HelpController {
    constructor() {
        this.help = false;
    }

    postConstruct() {
        this.helpDao = inject("helpDao");
    }

    prepareHelp() {
        this.help = true;
        const success = (mdText) => {
            document.getElementById("help").innerHTML = marked.parse(mdText);
        };
        const error = (errMessage) => {
            console.log(errMesssage);
        };
        this.helpDao.getHelpData(success, error);
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
