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
            
            <input type="text" id="search" onkeyup=editController.onPathChanged()>
            </input>
            <button onclick=mainController.newEndpoint()>
                + New
            </button>
        </div>

    `;
} 
