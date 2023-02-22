import { _ButtonHandler } from "../interfaces/ButtonHandler.interface";
export declare class ButtonHandler implements _ButtonHandler {
    id: string;
    callback: Function;
    element: HTMLButtonElement;
    /**
     * Handles interaction with a button in DOM
     * @param id Button id in HTML
     * @param callback Callback to run on click
     */
    constructor(id: string, callback: Function);
}
