export interface _ButtonHandler {
    id:       string,           // Button id in HTML file
    element:  HTMLButtonElement // Element in DOM
    callback: Function          // Callback to respond to onclick event
}