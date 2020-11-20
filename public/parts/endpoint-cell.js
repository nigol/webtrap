/*jshint esversion: 6 */

/**
* Render cell with endpoint.
*/

function EndpointCell(endpoint) {
    return `
        <div class="endpointCell ${endpoint.method}" onclick="mainController.getEndpoint('${endpoint.path}', '${endpoint.method}')">
            <span class="method ${endpoint.method}">${endpoint.method}</span>
            <b>${endpoint.path}</b>
            <div class="remove" onclick="mainController.removeEndpoint('${endpoint.path}', '${endpoint.method}')">
               ✕ 
            </div>
        </div>

    `;
} 
