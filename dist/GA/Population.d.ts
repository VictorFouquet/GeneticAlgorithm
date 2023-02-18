import { Individual } from "./Individual";
import { _Population } from "./interface/Population.interface";
/**
 * Abstract class used to create, store and evolve individuals
 */
export declare abstract class Population<T extends Individual<any>> implements _Population<T> {
    individuals: T[];
    individualCount: number;
    individualSize: number;
    bestFitness: number;
    averageFitness: number;
    IndividualClass: {
        new (...args: any[]): T;
    };
    /**
     * Creates a new population
     * @param individualCount Number of individuals in the population
     * @param individualSize  Number of genes for each individual
     * @param IndividualClass Individual class
     */
    constructor(individualCount: number, individualSize: number, IndividualClass: {
        new (...args: any[]): T;
    });
    /**
     * Must implement the culling of the population.
     * Culling is performed to reduce the size of the population.
     */
    abstract cull(): void;
    /**
     * Must implement the evaluation of the population.
     * Can be used as the fitness function or as a wrapper for the
     * fitness function.
     * Each individual should have his score computed after this function call.
     */
    abstract evaluate(): T[];
    /**
     * Must implement the mutation of the population.
     * Mutation is used to explore the solutions' search space
     */
    abstract mutate(): T[];
    /**
     * Randomly creates the population's first generation
     * @returns array of individuals
     */
    spawn(): T[];
    /**
     * Picks an individual from population according to the individuals probability
     * @returns picked individual
     */
    pick(): T;
    /**
     * Selects individuals for mating according to their fitness
     * @param count number of couples to select
     * @returns array of paired individuals
     */
    select(count: number): T[][];
    /**
     * Crosses over individual to create new offspring
     * @returns individuals after crossing over
     */
    crossover(): T[];
    /**
     * Wrapper function that creates a new generation
     * @returns all individuals from population
     */
    generate(): T[];
}
