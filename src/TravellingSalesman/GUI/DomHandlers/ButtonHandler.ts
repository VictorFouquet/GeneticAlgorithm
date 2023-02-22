import { _ButtonHandler } from "../interfaces/ButtonHandler.interface";

export class ButtonHandler implements _ButtonHandler {
    id:       string
    callback: Function
    element:  HTMLButtonElement

    /**
     * Handles interaction with a button in DOM
     * @param id Button id in HTML
     * @param callback Callback to run on click
     */
    constructor(id: string, callback: Function) {
        this.id = id;
        this.callback = callback;
        this.element = <HTMLButtonElement>document.getElementById(this.id);
        this.element.onclick = (e: MouseEvent) => this.callback();
        
    }
}