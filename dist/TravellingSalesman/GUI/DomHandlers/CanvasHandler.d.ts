import { _CanvasHandler } from "../interfaces/CanvasHandler.interface";
export declare class CanvasHandler implements _CanvasHandler {
    id: string;
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    /**
     * Implements basic interaction with a canvas
     * @param id Canvas id in HTML file
     */
    constructor(id: string);
    /** Wrapper for canvas' beginPath function */
    beginPath(): void;
    /**
     * Moves context to any position on canvas
     * @param x x position to move to
     * @param y y position to move to
     */
    moveTo(x: number, y: number): void;
    /**
     * Clears canvas and fills background
     * @param color color to fill background
     */
    clear(color: string): void;
    /**
     * Fills current path
     * @param color color to fill current path
     */
    fill(color: string): void;
    /**
     * Strokes current path
     * @param color color to stroke current path
     * @param width line width of the stroke
     */
    stroke(color: string, width: number): void;
    /**
     * Traces a circle
     * @param x x position of circle's center
     * @param y y position of circle's center
     * @param r circle's radius
     */
    traceCircle(x: number, y: number, r: number): void;
    /**
     * Traces a line between two points
     * @param x1 origin point x
     * @param y1 origin point y
     * @param x2 end point x
     * @param y2 end point y
     */
    traceLine(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * Traces a polygon containing any number of points
     * @param points array of [x, y] coordinates
     */
    tracePolygon(points: number[][]): void;
    /**
     * Traces a path composed of any number of points
     * @param points array of [x, y] coordinates
     * @param close  wether path should be closed
     */
    tracePath(points: number[][], close?: boolean): void;
}
