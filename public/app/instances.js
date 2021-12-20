/*jshint esversion: 6 */

import {MainController} from "./controllers/MainController.js";
import {EndpointDao} from "./daos/EndpointDao.js";
import {EndpointService} from "./services/EndpointService.js";
import {EditController} from "./controllers/EditController.js";
import {RequestDao} from "./daos/RequestDao.js";
import {RequestService} from "./services/RequestService.js";
import {HelpController} from "./controllers/HelpController.js"
import {HelpDao} from "./daos/HelpDao.js"

export const sessionScope = {
    "mainController": new MainController(),
    "endpointDao": new EndpointDao(),
    "endpointService": new EndpointService(),
    "editController": new EditController(),
    "requestDao": new RequestDao(),
    "requestService": new RequestService(),
    "helpController": new HelpController(),
    "helpDao": new HelpDao()
};

export function inject(key) {
    return sessionScope[key];
}

sessionScope.mainController.postConstruct();
sessionScope.endpointService.postConstruct();
sessionScope.editController.postConstruct();
sessionScope.requestService.postConstruct();