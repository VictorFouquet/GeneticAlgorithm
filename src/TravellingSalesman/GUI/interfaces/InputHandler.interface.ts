export interface _InputHandler {
    id:       string,          // Id of the input in the HTML file
    value:    string,          // Element's value
    element:  HTMLInputElement // Input element in DOM
    callback: Function         // Callback to run on input event
}