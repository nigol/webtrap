/*jshint esversion: 6 */

/**
* Render grid with endpoints.
*/

function EndpointsGrid() {
    if (mainController.getSelectedEndpoint() !== undefined) {
        return "";
    }
    var endPoints = mainController.getEndpoints();
    return `
        <h2>Endpoints (${endPoints.length})</h2>
        <div class="endpointsGrid">
            ${
                endPoints.map((endpoint) => EndpointCell(endpoint))
                    .reduce((total, e) => total + e, "")
            }
        </div>

    `;
} 
