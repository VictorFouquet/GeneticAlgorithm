import { Population } from "../../GA/index";
import { IndividualTS } from "./IndividualTS";


/**
 * Population representing solutions to the Traveling Salesman Problem
 */
export class PopulationTS extends Population<IndividualTS> {
    cities: number[][];
    noImprovementCount: number;
    previousBestFitness: number;
    averageFitnesses: number[];

    /**
     * Instantiates a new population to solve a set of cities
     * @param individualCount Number of individuals in the population
     * @param cities Set of cities coordinates to visit
     */
    constructor(individualCount: number, cities: number[][], mutationRate: number) {
        super(individualCount, cities.length, mutationRate, IndividualTS);
        this.cities = cities;
        this.bestFitness = -Infinity;
        this.previousBestFitness = -Infinity;
        this.noImprovementCount = 0;
        this.averageFitnesses = [];
    }

    /**
     * Computes distance between two cities
     * @param id1 Index of first city
     * @param id2 Index of second city
     * @returns Distance from first to second city
     */
    private getDistance(id1: number, id2: number): number {
        // Gets the cities to compute the distance from
        const city1: number[] = this.cities[id1];
        const city2: number[] = this.cities[id2];

        // Distance is the hypothenus of the right triangle formed by points :
        //     A[c1.x, c1.y], B[c2.x, c1.y], C[c2.x, c2.y] 
        const distance: number = Math.hypot(
            city2[0] - city1[0],
            city2[1] - city1[1]
        )

        return distance;
    }

    /**
     * Computes the individuals fitness
     * An individual fitness is the total distance taken to visit all cities
     * only once and loop back to the starting city
     * @returns Individuals with updated fitness
     */
    evaluate(): IndividualTS[] {
        this.averageFitness = 0;
        this.previousBestFitness = this.bestFitness;
        this.bestFitness = -Infinity;

        for (let i = 0; i < this.individuals.length; i++) {
            this.individuals[i].fitness = 0;
            // Sums distances between cities according to individual's genes
            for (let j = 0; j < this.individualSize - 1; j++) {
                this.individuals[i].fitness += this.getDistance(
                    this.individuals[i].genes[j],
                    this.individuals[i].genes[j+1]
                )
            }
            // Adds the distance from last to first city that closes the loop
            this.individuals[i].fitness += this.getDistance(
                this.individuals[i].genes[0],
                this.individuals[i].genes[this.individualSize-1]
            )
            // Adds individual fitness to average
            this.averageFitness += this.individuals[i].fitness;
            if (this.individuals[i].fitness > this.bestFitness) {
                this.bestFitness = this.individuals[i].fitness;
            }
        }
        // Averages population's fitness
        this.averageFitness /= this.individuals.length;
        if (this.previousBestFitness >= this.bestFitness) {
            this.noImprovementCount++;
        } else {
            this.noImprovementCount = 0;
        }
        return this.individuals;
    }

    /**
     * Sorts individual by fitness and only keep the fittest ones
     * to keep individuals count constant
     */
    cull(): void {
        this.individuals.sort((a,b) => b.fitness - a.fitness);
        this.individuals.splice(0, this.individualCount);
    }

    /**
     * Mutates individual according to a hardcoded probability.
     * Swaps two indices in the individual's genes if he does mutate.
     * TODO -- Create a config file to store the algorithm metadata
     * @returns Mutated individuals
     */
    mutate(): IndividualTS[] {
        for (let i = 0; i < this.individualCount; i++) {
            const random: number = Math.random()
            if (random < this.mutationRate) {
                // Randomly picks two different indices
                let [rand1, rand2]: number[] = [
                    Math.floor(Math.random() * this.individualSize),
                    Math.floor(Math.random() * this.individualSize)
                ]
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
                ] 
            }
        }
        return this.individuals;
    }
}