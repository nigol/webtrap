/*jshint esversion: 6 */

/**
* Render edit form for endpoint.
*/

function EndpointEdit() {
    if (!editController.isEdit()) {
        return "";
    }
    return `
        <h2>New endpoint</h2>
        <div class="endpointEdit">
            <div class="endpointEditGrid">
                <div>
                    <label for="method">HTTP Method (required)</label>
                    <br/>
                    <select id="method" onchange="editController.onMethodChanged()">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
                
                <div>
                    <label for="path">Path (required)</label>
                    <br/>
                    <input type="text" id="path" onkeyup=editController.onPathChanged()></input>
                </div>

                <div>
                    <label for="responseCode">HTTP Response Code (required)</label>
                    <br/>
                    <input type="text" id="responseCode" onkeyup=editController.onResponseCodeChanged()></input>
                </div>
            </div>

            <div>
                <label for="responseMime">Response MIME type</label>
                <br/>
                <input type="text" id="responseMime" 
                    onkeyup=editController.onResponseMimeChanged()></input>
            </div>

            <div>
                <label for="response">Response</label>
                <br/>
                <textarea id="response" onkeyup=editController.onResponseChanged()></textarea>
            </div>
        </div>

        <span id="saveButton">
            <script type="module">
                var button = "<button onclick=editController.save()>Save</button>";
                if (!editController.formValid) {
                    button = "<button disabled = 'disabled' onclick=editController.save()>Save</button>";
                }
                saveButton.innerHTML += button;
            </script>
        </span>

        <button onclick="editController.cancel()">Cancel</button>

    `;
} 
