export interface _CanvasHandler {
    id:      string                   // Id of the canvas in the HTML file
    element: HTMLCanvasElement        // Canvas element in DOM
    context: CanvasRenderingContext2D // Rendering context of canvas
    width:   number                   // Width of the canvas
    height:  number                   // Height of the canvas

    beginPath():                          void // Starts a new path
    moveTo(x: number, y:number):          void // Moves canvas cursor to [x, y] point
    clear(color: string):                 void // Clears canvas and fills background
    fill(color: string):                  void // Fills current path
    stroke(color: string, width: number): void // Strokes current path

    traceCircle(x: number, y: number, r: number):              void;
    traceLine(x1: number, y1: number, x2: number, y2: number): void;
    tracePath(points: number[][]):                             void;
    tracePolygon(points: number[][], close: boolean):          void;
}