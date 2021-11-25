/*jshint esversion: 6 */

/**
* Render bar with buttons.
*/

function ButtonBar() {
    if (editController.isEdit() || mainController.getSelectedEndpoint()) {
        return "";
    }
    return `
        <div class="buttonBar">
            <div>
                <button onclick=mainController.newEndpoint()>
                    + New
                </button>
                <button onclick=mainController.newEndpoint()>
                    Download
                </button>
            </div>

            <div></div>

            <input type="text" id="filter" placeholder="Type to filter"
                onkeyup=mainController.onFilterChanged()>
            </input>
        </div>

    `;
} 
