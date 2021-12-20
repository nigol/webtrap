/*jshint esversion: 6 */

/**
* Render help page.
*/

function HelpPage() {
    if (!helpController.isHelp()) {
        return "";
    }
    return `
        <h2>Webtrap help</h2>

        <div id="help"></div>
        
        <button onclick=helpController.close()>Close</button>
    `;
} 
