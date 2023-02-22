import { _GUI } from "./interfaces/GUI.interface";
import { GUIConfig } from "./types/GUIConfig.type";
import { ButtonHandler } from "./DomHandlers/ButtonHandler";
import { InputHandler } from "./DomHandlers/InputHandler";
import { CanvasHandler } from "./DomHandlers/CanvasHandler";
export declare class GUI implements _GUI {
    config: GUIConfig;
    pathCanvasHandler: CanvasHandler;
    fitnessCanvasHandler: CanvasHandler;
    evolveBtnHandler: ButtonHandler;
    resetCitiesBtnHandler: ButtonHandler;
    resetPopBtnHandler: ButtonHandler;
    cityInputHandler: InputHandler;
    individualInputHandler: InputHandler;
    mutationRateInputHandler: InputHandler;
    generationCountStat: HTMLDivElement;
    shortestPathStat: HTMLDivElement;
    /**
     * Graphic user interface for Travelling Salesman Problem
     * @param evolveBtnCB evolve button onclick callback
     * @param resetCitiesBtnCB reset cities button onclick callback
     * @param resetPopBtnCB reset population button onclick callback
     * @param cityCountInputCB city count input oninput callback
     * @param cityCountInit city count input initial value
     * @param individualCountInputCB individual count input oninput callback
     * @param individualCountInit individual count input initial value
     * @param mutationRateInputCB mutation rate input oninput callback
     * @param mutationRateInit mutation rate input initial value
     */
    constructor(evolveBtnCB: Function, resetCitiesBtnCB: Function, resetPopBtnCB: Function, cityCountInputCB: Function, cityCountInit: number, individualCountInputCB: Function, individualCountInit: number, mutationRateInputCB: Function, mutationRateInit: number);
    /**
     * Initializes input handlers callbacks and sets their initial values
     * @param cityCountInputCB city count input oninput callback
     * @param cityCountInit city count input initial value
     * @param individualCountInputCB individual count input oninput callback
     * @param individualCountInit individual count input initial value
     * @param mutationRateInputCB mutation rate input oninput callback
     * @param mutationRateInit mutation rate input initial value
     */
    initInputHandlers(cityCountInputCB: Function, cityCountInit: number, individualCountInputCB: Function, individualCountInit: number, mutationRateInputCB: Function, mutationRateInit: number): void;
    /** Initializes canvas handlers */
    initCanvasHandlers(): void;
    /**
     * Initializes buttons handlers
     * @param evolveBtnCB evolve button onclick callback
     * @param resetCitiesBtnCB reset cities button onclick callback
     * @param resetPopBtnCB reset population button onclick callback
     */
    initButtonHandlers(evolveCB: Function, resetCitiesCB: Function, resetPopCB: Function): void;
    /** Clears both path and fitness canvases */
    clearCanvases(): void;
    /** Resets statistics data and clears fitness canvas */
    clearStatistics(): void;
    /**
     * Traces and fills cities on path canvas
     * @param cities array of cities coordinates
     */
    displayCities(cities: number[][]): void;
    /**
     * Traces individuals on path canvas
     * @param individuals individuals as a list of city coordinates
     */
    displayGenes(individuals: number[][]): void;
    /**
     * Traces and strokes individuals on path canvas
     * @param individuals individuals as a list of city coordinates
     */
    displayPopulation(individuals: number[][]): void;
    /** Traces fittest individual on path canvas */
    displayFittest(individuals: number[][]): void;
    /** Traces, fills and strokes average fitnesses on fitness canvas */
    displayAverageFitnesses(fitnesses: number[]): void;
    /**
     * Samples a point from a canvas with respect to a given padding
     * @param canvasID canvas to sample points from
     * @param padding padding to apply for sampling
     * @returns [x, y] coordinates of sampled point
     */
    sampleCanvas(canvasID: string, padding: number): number[];
    /**
     * Updates city input's label with new number of cities
     * @param cityCount number of cities to show in label
     */
    updateCities(cityCount: number): void;
    /**
     * Updates individual input's label with new individual count
     * @param popSize number of individuals to show in label
     */
    updateIndividuals(popSize: number): void;
    /**
     * Updates mutation input's label with new mutation rate
     * @param cityCount number of cities to show in label
     */
    updateMutation(rate: number): void;
    /**
     * Updates current generation number in statistics panel
     * @param generation
     */
    updateGeneration(generation: number): void;
    /**
     * Updates current shortest path lenght in statistics panel
     * @param shortest shortest path length
     */
    updateShortest(shortest: number): void;
}
