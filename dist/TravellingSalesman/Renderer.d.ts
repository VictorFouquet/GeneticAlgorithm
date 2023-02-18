import { _Renderer } from "./interface/Renderer.interface";
export declare class Renderer implements _Renderer {
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
    /**
     * Instantiates a renderer
     * @param canvasId Id of the canvas used to render
     */
    constructor(canvasId: string);
    /** Clears canvas */
    clear(): void;
    /**
     * Draws a line between two city points
     * @param x1 x coord of first city
     * @param y1 y coord of first city
     * @param x2 x coord of second city
     * @param y2 y coord of second city
     */
    drawLine(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Draws a circle to render a city
     * @param x x coordinate of city
     * @param y y coordinate of city
     * @param r radius of city
     */
    drawCircle(x: number, y: number, r: number): void;
    /**
     * Draws all lines formed by fittest pairs of points
     * @param genes genes composing the individual
     */
    drawFittest(genes: number[][]): void;
    /**
     * Draws all lines formed by pair of points
     * @param genes genes composing the whole population
     */
    drawGenes(genes: number[][]): void;
    /**
     * Draws an array of cities
     * @param cities cities to render
     */
    drawCities(cities: number[][]): void;
}
