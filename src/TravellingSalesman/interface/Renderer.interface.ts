export interface _Renderer {
    canvas:        HTMLCanvasElement;        // Canvas DOM element
    ctx:           CanvasRenderingContext2D; // Canvas 2d contex
    canvasW:       number;                   // Canvas width
    canvasH:       number;                   // Canvas height
    cityRadius:    number;                   // City circle radius
    cityFill:      string;                   // City fill color
    cityStroke:    string;                   // City stroke color
    geneStroke:    string;                   // Gene stroke color
    fittestStroke: string;                   // Fittest individual stroke color
    strokeStyle:   string;                   // Current stroke style
    lineWidth:     number;                   // Current line width

    clear(): void;
    drawLine(x1: number, y1: number, x2: number, y2: number): void;
    drawCircle(x: number, y: number, r: number):              void;
    drawFittest(genes: number[][]):                           void;
    drawGenes(genes: number[][]):                             void;
    drawCities(cities: number[][]):                           void;
}