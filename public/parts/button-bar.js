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
            <button onclick=mainController.newEndpoint()>
                + New
            </button>
        </div>

    `;
} 
