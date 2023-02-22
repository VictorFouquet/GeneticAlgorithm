export class InputHandler {
    /**
     * Handles interaction with an input element
     * @param id input's id in HTML file
     * @param value input's initial value
     * @param callback callback to run on input
     */
    constructor(id, value, callback) {
        this.id = id;
        this.value = value;
        this.callback = callback;
        this.element = document.getElementById(this.id);
        this.label = this.element.labels[0];
        this.element.value = this.value;
        this.element.oninput = (e) => {
            const target = e.target;
            this.callback(parseFloat(target.value));
        };
    }
    /**
     * Updates label's text content
     * @param text text to display in label
     */
    updateLabel(text) {
        this.label.textContent = text;
    }
}
