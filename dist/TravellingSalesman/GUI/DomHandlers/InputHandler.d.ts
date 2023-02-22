import { _InputHandler } from "../interfaces/InputHandler.interface";
export declare class InputHandler implements _InputHandler {
    id: string;
    value: string;
    callback: Function;
    element: HTMLInputElement;
    label: HTMLLabelElement;
    /**
     * Handles interaction with an input element
     * @param id input's id in HTML file
     * @param value input's initial value
     * @param callback callback to run on input
     */
    constructor(id: string, value: string, callback: Function);
    /**
     * Updates label's text content
     * @param text text to display in label
     */
    updateLabel(text: string): void;
}
