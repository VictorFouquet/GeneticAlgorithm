export interface _CanvasHandler {
    id: string;
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    beginPath(): void;
    moveTo(x: number, y: number): void;
    clear(color: string): void;
    fill(color: string): void;
    stroke(color: string, width: number): void;
    traceCircle(x: number, y: number, r: number): void;
    traceLine(x1: number, y1: number, x2: number, y2: number): void;
    tracePath(points: number[][]): void;
    tracePolygon(points: number[][], close: boolean): void;
}
