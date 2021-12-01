/*jshint esversion: 6 */

/**
* Render grid with endpoint edit and info.
*/

function EndpointDetailGrid() {
    if (mainController.getSelectedEndpoint() === undefined) {
        return "";
    }
    var endpoint = mainController.getSelectedEndpoint();
    return `
        <h2><span class="method ${endpoint.method}">${endpoint.method}</span> ${endpoint.path} [${window.location.href}trp${endpoint.path}]</h2>

        <div class="endpointDetailGrid">
            <div>
                <label for="request">Request</label>
                <br/>
                <textarea id="request">${mainController.requestText}</textarea>
            </div>

            <div>
                <div class="endpointEditGrid">
                    <div>
                        <label for="method">HTTP Method</label>
                        <br/>
                        <span id="method">${endpoint.method}</span>
                    </div>
                    
                    <div>
                        <label for="path">Path</label>
                        <br/>
                        <span id="path">${endpoint.path}</span>
                    </div>

                    <div>
                        <label for="responseCode">HTTP Response Code</label>
                        <br/>
                        <span id="responseCode">${endpoint.responseCode}</span>
                    </div>
                </div>

                <div>
                    <br>
                    <label for="responseMime">Response MIME type</label>
                    <br/>
                    <span id="responseMime">${endpoint.responseMime}</span>
                </div>

                <div>
                    <br>
                    <label for="response">Response</label>
                    <br/>
                    <textarea id="response"
                        onblur=mainController.updateSelectedEndpoint()>${endpoint.response}</textarea>
                </div>
            </div>
            </div>
        </div>
        
        <button onclick=mainController.closeDetail()>Close</button>
    `;
} 
