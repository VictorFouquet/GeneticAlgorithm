import { Population } from "../GA/index";
import { IndividualTS } from "./IndividualTS";
/**
 * Population representing solutions to the Traveling Salesman Problem
 */
export class PopulationTS extends Population {
    /**
     * Instantiates a new population to solve a set of cities
     * @param individualCount Number of individuals in the population
     * @param cities Set of cities coordinates to visit
     */
    constructor(individualCount, cities) {
        super(individualCount, cities.length, IndividualTS);
        this.cities = cities;
    }
    /**
     * Computes distance between two cities
     * @param id1 Index of first city
     * @param id2 Index of second city
     * @returns Distance from first to second city
     */
    getDistance(id1, id2) {
        // Gets the cities to compute the distance from
        const city1 = this.cities[id1];
        const city2 = this.cities[id2];
        // Distance is the hypothenus of the right triangle formed by points :
        //     A[c1.x, c1.y], B[c2.x, c1.y], C[c2.x, c2.y] 
        const distance = Math.hypot(city2[0] - city1[0], city2[1] - city1[1]);
        return distance;
    }
    /**
     * Computes the individuals fitness
     * An individual fitness is the total distance taken to visit all cities
     * only once and loop back to the starting city
     * @returns Individuals with updated fitness
     */
    evaluate() {
        this.averageFitness = 0;
        for (let i = 0; i < this.individuals.length; i++) {
            this.individuals[i].fitness = 0;
            // Sums distances between cities according to individual's genes
            for (let j = 0; j < this.individualSize - 1; j++) {
                this.individuals[i].fitness += this.getDistance(this.individuals[i].genes[j], this.individuals[i].genes[j + 1]);
            }
            // Adds the distance from last to first city that closes the loop
            this.individuals[i].fitness += this.getDistance(0, this.individualSize - 1);
            // Adds individual fitness to average
            this.averageFitness += this.individuals[i].fitness;
        }
        // Averages population's fitness
        this.averageFitness /= this.individuals.length;
        return this.individuals;
    }
    /**
     * Sorts individual by fitness and only keep the fittest ones
     * to keep individuals count constant
     */
    cull() {
        this.individuals.sort((a, b) => b.fitness - a.fitness);
        this.individuals.splice(0, this.individualCount);
    }
    /**
     * Mutates individual according to a hardcoded probability.
     * Swaps two indices in the individual's genes if he does mutate.
     * TODO -- Create a config file to store the algorithm metadata
     * @returns Mutated individuals
     */
    mutate() {
        for (let i = 0; i < this.individualCount; i++) {
            if (Math.random() < 0.1) {
                // Randomly picks two different indices
                let [rand1, rand2] = [
                    Math.floor(Math.random() * this.individualSize),
                    Math.floor(Math.random() * this.individualSize)
                ];
                while (rand1 == rand2) {
                    rand2 = Math.floor(Math.random() * this.individualSize);
                }
                // Swaps genes
                [
                    this.individuals[i][rand1],
                    this.individuals[i][rand2]
                ] = [
                    this.individuals[i][rand2],
                    this.individuals[i][rand1]
                ];
            }
        }
        return this.individuals;
    }
}
