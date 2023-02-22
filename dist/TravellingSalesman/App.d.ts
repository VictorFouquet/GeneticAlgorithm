import { IndividualTS } from "./GeneticAlgorithm/IndividualTS";
import { PopulationTS } from "./GeneticAlgorithm/PopulationTS";
import { PopulationData } from "./GUI/types/PopulationData.type";
import { GUI } from "./GUI/GUI";
export declare class App {
    cityCount: number;
    cities: number[][];
    popSize: number;
    population: PopulationTS;
    mutationRate: number;
    rendererInterval: number;
    isPlaying: boolean;
    gui: GUI;
    /**
     * Main app class to solve and render Travelling Salesman Problem
     * @param cityCount number of cities
     * @param popSize number of individual in population
     * @param mutationRate population's mutation rate
     */
    constructor(cityCount: number, popSize: number, mutationRate: number);
    /** Initializes application, creating cities and population */
    init(): void;
    /** Creates cities with random coordinates in canvas limits */
    createCities(): void;
    /**
     * Sets cities count, creates or destroy cities accordingly, and updates GUI
     * @param count new number of cities
     */
    updateCities(count?: number): void;
    /** Destroys previous cities, creates new set and updates GUI */
    resetCities(): void;
    /** Creates and spawn a population */
    createPopulation(): void;
    /**
     * Updates population size, creates new population accordingly and updates GUI
     * @param count new number of individuals
     */
    updatePopulation(count: number): void;
    /** Resets population's individuals and updates GUI */
    resetPopulation(): void;
    /**
     * Converts an individual's genes to a list of cities
     * @param individual Individual to convert to a city pairs array
     * @returns city pairs array
     */
    individualToCityArray(individual: IndividualTS): number[][];
    /**
     * Updates population's mutation rate and GUI accodringly
     * @param rate new mutation rate
     */
    updateMutation(rate: number): void;
    /** Gets and formats population data for display and GUI update */
    getPopulationData(): PopulationData;
    /** Evolves the population and render new generation */
    evolve(): void;
    /** Evolves population and render it every 250ms */
    run(): void;
}
