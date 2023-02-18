export interface _Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasW: number;
    canvasH: number;
    cityRadius: number;
    cityFill: string;
    cityStroke: string;
    geneStroke: string;
    fittestStroke: string;
    strokeStyle: string;
    lineWidth: number;
    clear(): void;
    drawLine(x1: number, y1: number, x2: number, y2: number): void;
    drawCircle(x: number, y: number, r: number): void;
    drawFittest(genes: number[][]): void;
    drawGenes(genes: number[][]): void;
    drawCities(cities: number[][]): void;
}
