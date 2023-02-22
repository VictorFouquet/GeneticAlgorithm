import { _GUI } from "./interfaces/GUI.interface";
import { GUIConfig } from "./types/GUIConfig.type";
import { config } from "./GUIConfig";

import { ButtonHandler } from "./DomHandlers/ButtonHandler";
import { InputHandler } from "./DomHandlers/InputHandler";
import { CanvasHandler } from "./DomHandlers/CanvasHandler";

export class GUI implements _GUI {
    config: GUIConfig
    // Canvases handlers
    pathCanvasHandler:        CanvasHandler
    fitnessCanvasHandler:     CanvasHandler
    // Buttons handlers
    evolveBtnHandler:         ButtonHandler
    resetCitiesBtnHandler:    ButtonHandler
    resetPopBtnHandler:       ButtonHandler
    // Inputs handlers
    cityInputHandler:         InputHandler
    individualInputHandler:   InputHandler
    mutationRateInputHandler: InputHandler
    // Statistics divs
    generationCountStat:      HTMLDivElement
    shortestPathStat:         HTMLDivElement

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
    constructor(
        evolveBtnCB:            Function,
        resetCitiesBtnCB:       Function,
        resetPopBtnCB:          Function,
        cityCountInputCB:       Function, cityCountInit:       number,
        individualCountInputCB: Function, individualCountInit: number,
        mutationRateInputCB:    Function, mutationRateInit:    number
    ) {
        this.config = config;        
        this.initCanvasHandlers();
        this.initButtonHandlers(evolveBtnCB, resetCitiesBtnCB, resetPopBtnCB);
        this.initInputHandlers(
            cityCountInputCB,       cityCountInit,
            individualCountInputCB, individualCountInit,
            mutationRateInputCB,    mutationRateInit
        );
        this.clearCanvases();
    }


      //-------------------------------------------------------------//
     //     Initialisation functions                                //
    //-------------------------------------------------------------//


    /**
     * Initializes input handlers callbacks and sets their initial values
     * @param cityCountInputCB city count input oninput callback
     * @param cityCountInit city count input initial value
     * @param individualCountInputCB individual count input oninput callback
     * @param individualCountInit individual count input initial value
     * @param mutationRateInputCB mutation rate input oninput callback
     * @param mutationRateInit mutation rate input initial value
     */
    initInputHandlers(
        cityCountInputCB:       Function, cityCountInit:       number,
        individualCountInputCB: Function, individualCountInit: number,
        mutationRateInputCB:    Function, mutationRateInit:    number
    ): void {
        this.cityInputHandler = new InputHandler(
            this.config.cityInputId,
            cityCountInit.toString(),
            cityCountInputCB
        );
        this.updateCities(cityCountInit);

        this.individualInputHandler = new InputHandler(
            this.config.individualInputId,
            individualCountInit.toString(),
            individualCountInputCB
        );
        this.updateIndividuals(individualCountInit);

        this.mutationRateInputHandler = new InputHandler(
            this.config.mutationRateInputId,
            mutationRateInit.toString(),
            mutationRateInputCB
        )
        this.updateMutation(mutationRateInit);
        this.generationCountStat = <HTMLDivElement>document.getElementById(this.config.generationCountId);
        this.shortestPathStat = <HTMLDivElement>document.getElementById(this.config.shortestPathId);
    }

    /** Initializes canvas handlers */
    initCanvasHandlers(): void {
        this.pathCanvasHandler    = new CanvasHandler(this.config.pathCanvasId);
        this.fitnessCanvasHandler = new CanvasHandler(this.config.fitnessCanvasId);
    }

    /**
     * Initializes buttons handlers
     * @param evolveBtnCB evolve button onclick callback
     * @param resetCitiesBtnCB reset cities button onclick callback
     * @param resetPopBtnCB reset population button onclick callback
     */
    initButtonHandlers(evolveCB: Function, resetCitiesCB: Function, resetPopCB: Function): void {
        this.evolveBtnHandler      = new ButtonHandler(this.config.evolveBtnId, evolveCB);
        this.resetCitiesBtnHandler = new ButtonHandler(this.config.resetCitiesBtnId, resetCitiesCB);
        this.resetPopBtnHandler    = new ButtonHandler(this.config.resetPopBtnId, resetPopCB);
    }

    /** Clears both path and fitness canvases */
    clearCanvases(): void {
        this.pathCanvasHandler.clear(this.config.clearStyle);
        this.fitnessCanvasHandler.clear(this.config.clearStyle);
    }

    /** Resets statistics data and clears fitness canvas */
    clearStatistics(): void {
        this.fitnessCanvasHandler.clear(this.config.clearStyle);
        this.updateGeneration(0);
        this.updateShortest(0);
    }

      //-------------------------------------------------------------//
     //     Canvas graphic rendering functions                      //
    //-------------------------------------------------------------//

    /**
     * Traces and fills cities on path canvas
     * @param cities array of cities coordinates
     */
    displayCities(cities: number[][]): void {
        this.pathCanvasHandler.beginPath()
        for (let i = 0; i < cities.length; i++) {
            this.pathCanvasHandler.traceCircle(
                cities[i][0], cities[i][1], this.config.circleRadius
            );
        }
        this.pathCanvasHandler.fill(this.config.cityFill)
    }

    /**
     * Traces individuals on path canvas
     * @param individuals individuals as a list of city coordinates
     */
    displayGenes(individuals: number[][]): void {
        this.pathCanvasHandler.beginPath();
        for (let i = 0; i < individuals.length; i++) {
            this.pathCanvasHandler.traceLine(
                individuals[i][0], individuals[i][1],
                individuals[i][2], individuals[i][3]
            );
        }
    }

    /**
     * Traces and strokes individuals on path canvas
     * @param individuals individuals as a list of city coordinates
     */
    displayPopulation(individuals: number[][]): void {
        this.pathCanvasHandler.clear(this.config.clearStyle);
        this.displayGenes(individuals);
        this.pathCanvasHandler.stroke(this.config.popStrokeStyle, 1);
    }

    /** Traces fittest individual on path canvas */
    displayFittest(individuals: number[][]): void {
        this.displayGenes(individuals);
        this.pathCanvasHandler.stroke(this.config.fittestStrokeStyle, 1);
    }

    /** Traces, fills and strokes average fitnesses on fitness canvas */
    displayAverageFitnesses(fitnesses: number[]): void {
        const canvasW: number = this.fitnessCanvasHandler.width;
        const canvasH: number = this.fitnessCanvasHandler.height;
        const spaceWidth: number = canvasW / fitnesses.length;

        this.fitnessCanvasHandler.beginPath();
        this.fitnessCanvasHandler.moveTo(0, 0);
        const points = fitnesses.map((fit, i) => [
            Math.round(i * spaceWidth),
            Math.round(canvasH - (canvasH * fit))
        ]);
        points.push([canvasW, points[points.length-1][1]]);
        this.fitnessCanvasHandler.tracePath(points);

        this.fitnessCanvasHandler.stroke(this.config.fitnessesStrokeColor, 3);
        const shapeBottom: number[][] = [[canvasW, canvasH], [0, canvasH]];
        this.fitnessCanvasHandler.tracePath(shapeBottom, true);
        this.fitnessCanvasHandler.fill(this.config.fitnessesFillColor);
    }

    /**
     * Samples a point from a canvas with respect to a given padding
     * @param canvasID canvas to sample points from
     * @param padding padding to apply for sampling
     * @returns [x, y] coordinates of sampled point
     */
    sampleCanvas(canvasID: string, padding: number): number[] {
        let canvasW: number, canvasH: number;
        if (canvasID == this.config.pathCanvasId) {
            canvasW = this.pathCanvasHandler.width;
            canvasH = this.pathCanvasHandler.height;
        } else if (canvasID == this.config.fitnessCanvasId) {
            canvasW = this.fitnessCanvasHandler.width;
            canvasH = this.fitnessCanvasHandler.height;
        } else {
            return [-1, -1]
        }
        return [
            Math.max(padding, Math.min(canvasW - padding, Math.random() * canvasW)),
            Math.max(padding, Math.min(canvasH - padding, Math.random() * canvasH))
        ]
    }


      //-------------------------------------------------------------//
     //     UI data update functions                                //
    //-------------------------------------------------------------//


    /**
     * Updates city input's label with new number of cities
     * @param cityCount number of cities to show in label
     */
    updateCities(cityCount: number): void {
        this.cityInputHandler.updateLabel(`Cities: ${cityCount}`);
    }

    /**
     * Updates individual input's label with new individual count
     * @param popSize number of individuals to show in label
     */
    updateIndividuals(popSize: number): void {
        this.individualInputHandler.updateLabel(`Individuals: ${popSize}`)
    }

    /**
     * Updates mutation input's label with new mutation rate
     * @param cityCount number of cities to show in label
     */
    updateMutation(rate: number): void {
        this.mutationRateInputHandler.updateLabel(`Mutation rate: ${rate}`)
    }

    /**
     * Updates current generation number in statistics panel
     * @param generation
     */
    updateGeneration(generation: number): void {
        this.generationCountStat.innerText = generation.toString();
    }

    /**
     * Updates current shortest path lenght in statistics panel
     * @param shortest shortest path length
     */
    updateShortest(shortest: number): void {
        this.shortestPathStat.innerText = shortest.toFixed(2);
    }
}