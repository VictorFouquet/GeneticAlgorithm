import { IndividualTS } from "./IndividualTS";
import { PopulationTS } from "./PopulationTS";
import { Renderer } from "./Renderer";
export declare class App {
    canvasID: string;
    cityCount: number;
    cities: number[][];
    renderer: Renderer;
    population: PopulationTS;
    constructor(canvasID: string, cityCount: number);
    /** Initializes application, creating cities and population */
    init(): void;
    /** Creates cities with random coordinates in canvas limits */
    createCities(): void;
    /** Creates and spawn a population, hardcoded to 750 individuals */
    createPopulation(): void;
    /**
     * Converts an individual genome to a list of cities to link with lines
     * @param individual Individual to convert to a city pairs array
     * @returns city pairs array
     */
    individualToCityArray(individual: IndividualTS): number[][];
    /** Evolves the population and render new generation */
    update(): void;
    /** Updates population and render it every 250ms */
    run(): void;
}
