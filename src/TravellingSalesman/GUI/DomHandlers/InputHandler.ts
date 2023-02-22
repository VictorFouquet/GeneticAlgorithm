import { _InputHandler } from "../interfaces/InputHandler.interface";

export class InputHandler implements _InputHandler {
    id:       string
    value:    string
    callback: Function
    element:  HTMLInputElement
    label:    HTMLLabelElement

    /**
     * Handles interaction with an input element
     * @param id input's id in HTML file
     * @param value input's initial value
     * @param callback callback to run on input
     */
    constructor(id: string, value: string, callback: Function) {
        this.id = id;
        this.value = value;
        this.callback = callback;
        this.element = <HTMLInputElement>document.getElementById(this.id);
        this.label = this.element.labels[0];
        this.element.value = this.value;
        this.element.oninput = (e: InputEvent) => {
            const target: HTMLInputElement = <HTMLInputElement>e.target;
            this.callback(parseFloat(target.value));
        }
    }

    /**
     * Updates label's text content
     * @param text text to display in label
     */
    updateLabel(text: string): void {
        this.label.textContent = text;
    }
}