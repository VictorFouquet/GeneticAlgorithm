export class ButtonHandler {
    /**
     * Handles interaction with a button in DOM
     * @param id Button id in HTML
     * @param callback Callback to run on click
     */
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
        this.element = document.getElementById(this.id);
        this.element.onclick = (e) => this.callback();
    }
}
