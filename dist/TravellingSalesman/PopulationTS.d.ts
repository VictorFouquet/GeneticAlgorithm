import { Population } from "../GA/index";
import { IndividualTS } from "./IndividualTS";
/**
 * Population representing solutions to the Traveling Salesman Problem
 */
export declare class PopulationTS extends Population<IndividualTS> {
    cities: number[][];
    /**
     * Instantiates a new population to solve a set of cities
     * @param individualCount Number of individuals in the population
     * @param cities Set of cities coordinates to visit
     */
    constructor(individualCount: number, cities: number[][]);
    /**
     * Computes distance between two cities
     * @param id1 Index of first city
     * @param id2 Index of second city
     * @returns Distance from first to second city
     */
    private getDistance;
    /**
     * Computes the individuals fitness
     * An individual fitness is the total distance taken to visit all cities
     * only once and loop back to the starting city
     * @returns Individuals with updated fitness
     */
    evaluate(): IndividualTS[];
    /**
     * Sorts individual by fitness and only keep the fittest ones
     * to keep individuals count constant
     */
    cull(): void;
    /**
     * Mutates individual according to a hardcoded probability.
     * Swaps two indices in the individual's genes if he does mutate.
     * TODO -- Create a config file to store the algorithm metadata
     * @returns Mutated individuals
     */
    mutate(): IndividualTS[];
}
