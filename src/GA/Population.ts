import { Individual } from "./Individual";
import { _Population } from "./interface/Population.interface";

/**
 * Abstract class used to create, store and evolve individuals
 */
export abstract class Population<T extends Individual<any>>
           implements _Population<T> 
{
    individuals:     T[];
    individualCount:  number
    individualSize:   number
    mutationRate:     number
    bestFitness:      number
    averageFitness:   number
    averageFitnesses: number[]
    generation:       number
    IndividualClass:  { new(...args: any[]): T }

    /**
     * Creates a new population
     * @param individualCount Number of individuals in the population
     * @param individualSize  Number of genes for each individual
     * @param mutationRate    Probility for an individual to mutate
     * @param IndividualClass Individual class
     */
    constructor(
        individualCount: number,
        individualSize: number,
        mutationRate: number,
        IndividualClass: { new(...args: any[]): T }
    ) {
        this.individuals     = [];
        this.individualCount = individualCount;
        this.individualSize  = individualSize;
        this.mutationRate    = mutationRate;
        this.averageFitness  = 0;
        this.generation      = 0;
        this.IndividualClass = IndividualClass;
    }

    /**
     * Must implement the culling of the population.
     * Culling is performed to reduce the size of the population.
     */
    abstract cull(): void

    /**
     * Must implement the evaluation of the population.
     * Can be used as the fitness function or as a wrapper for the
     * fitness function.
     * Each individual should have his score computed after this function call.
     */
    abstract evaluate(): T[]

    /**
     * Must implement the mutation of the population.
     * Mutation is used to explore the solutions' search space
     */
    abstract mutate(): T[]

    /**
     * Randomly creates the population's first generation
     * @returns array of individuals
     */
    spawn(): T[] {
        for (let i = 0; i < this.individualCount; i++) {
            const individual: T = new this.IndividualClass(this.individualSize);
            individual.random();
            this.individuals[i] = individual;
        }
        return this.individuals;
    }

    /**
     * Picks an individual from population according to the individuals probability
     * @returns picked individual
     */
    pick(): T {
        let random: number = Math.random();
        for (let j = 0; j < this.individualCount; j++) {
            if (this.individuals[j].probability > random) {
                return this.individuals[j];
            }
        }
    }

    /**
     * Selects individuals for mating according to their fitness
     * @param count number of couples to select
     * @returns array of paired individuals
     */
    select(count: number): T[][] {
        const selected: T[][] = [];
        // Cumputes sum of all individuals' fitness
        const fitnessSum: number = this.individuals.reduce(
            (acc, curr) => acc + curr.fitness,
            0
        )
        // Computes inverse proportions for each individual
        this.individuals.forEach(individual => {
            individual.probability = fitnessSum / individual.fitness;
        })
        // Computes sum of all individuals' probability
        const propabilitySum: number = this.individuals.reduce(
            (acc, curr) => acc + curr.probability,
            0
        )
        // Normalizes probabilities
        this.individuals.forEach(individual => {
            individual.probability /= propabilitySum;
        })
        // Computes cumulative probabilities
        let cumulativeProbability: number = 0;
        this.individuals.forEach(individual => {
            cumulativeProbability += individual.probability;
            individual.probability = cumulativeProbability;
        })
        // Initializes parents for mating
        let parent1: T, parent2: T;
        // Applies random biased selection wheel
        for (let i = 0; i < count; i++) {
            parent1 = this.pick();
            parent2 = parent1;
            while (parent1 === parent2) {
                parent2 = this.pick();
            }
            selected.push([parent1, parent2])
        }
        

        return selected;
    }

    /**
     * Crosses over individual to create new offspring
     * @returns individuals after crossing over
     */
    crossover(): T[] {
        const offspring: T[] = [];
        // Two mates will create two individual so we need a selection
        // that is half the length of the population
        const parents: T[][] = this.select(Math.ceil(this.individualCount / 2));

        for (let i = 0; i < parents.length; i++) {
            const child1: T = new this.IndividualClass(this.individualSize);
            const child2: T = new this.IndividualClass(this.individualSize);
            const [parent1, parent2]: T[] = parents[i];

            // Sets offspring genes
            [child1.genes, child2.genes] = parent1.crossover(parent2);
            offspring.push(child1, child2);
        }
        return offspring;
    }

    /**
     * Wrapper function that creates a new generation
     * @returns all individuals from population
     */
    generate(): T[] {
        this.generation++;
        // Computes individuals' fitness
        this.evaluate();
        // Creates offspring and add them to the population
        const offspring: T[] = this.crossover();
        this.individuals.push(...offspring);
        // Evaluates population including offspring
        this.evaluate();
        this.averageFitnesses.push(this.averageFitness);
        // Remove less fit individuals
        this.cull();
        // Mutate survivors
        this.mutate();
        return this.individuals;
    }
}
