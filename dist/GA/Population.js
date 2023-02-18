/**
 * Abstract class used to create, store and evolve individuals
 */
export class Population {
    /**
     * Creates a new population
     * @param individualCount Number of individuals in the population
     * @param individualSize  Number of genes for each individual
     * @param IndividualClass Individual class
     */
    constructor(individualCount, individualSize, IndividualClass) {
        this.individuals = [];
        this.individualCount = individualCount;
        this.individualSize = individualSize;
        this.averageFitness = 0;
        this.IndividualClass = IndividualClass;
    }
    /**
     * Randomly creates the population's first generation
     * @returns array of individuals
     */
    spawn() {
        for (let i = 0; i < this.individualCount; i++) {
            const individual = new this.IndividualClass(this.individualSize);
            individual.random();
            this.individuals[i] = individual;
        }
        return this.individuals;
    }
    /**
     * Picks an individual from population according to the individuals probability
     * @returns picked individual
     */
    pick() {
        let random = Math.random();
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
    select(count) {
        const selected = [];
        // Cumputes sum of all individuals' fitness
        const fitnessSum = this.individuals.reduce((acc, curr) => acc + curr.fitness, 0);
        // Computes inverse proportions for each individual
        this.individuals.forEach(individual => {
            individual.probability = fitnessSum / individual.fitness;
        });
        // Computes sum of all individuals' probability
        const propabilitySum = this.individuals.reduce((acc, curr) => acc + curr.probability, 0);
        // Normalizes probabilities
        this.individuals.forEach(individual => {
            individual.probability /= propabilitySum;
        });
        // Computes cumulative probabilities
        let cumulativeProbability = 0;
        this.individuals.forEach(individual => {
            cumulativeProbability += individual.probability;
            individual.probability = cumulativeProbability;
        });
        // Initializes parents for mating
        let parent1, parent2;
        // Applies random biased selection wheel
        for (let i = 0; i < count; i++) {
            parent1 = this.pick();
            parent2 = parent1;
            while (parent1 === parent2) {
                parent2 = this.pick();
            }
            selected.push([parent1, parent2]);
        }
        return selected;
    }
    /**
     * Crosses over individual to create new offspring
     * @returns individuals after crossing over
     */
    crossover() {
        const offspring = [];
        // Two mates will create two individual so we need a selection
        // that is half the length of the population
        const parents = this.select(Math.ceil(this.individualCount / 2));
        for (let i = 0; i < parents.length; i++) {
            const child1 = new this.IndividualClass(this.individualSize);
            const child2 = new this.IndividualClass(this.individualSize);
            const [parent1, parent2] = parents[i];
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
    generate() {
        // Computes individuals' fitness
        this.evaluate();
        // Creates offspring and add them to the population
        const offspring = this.crossover();
        this.individuals.push(...offspring);
        // Evaluates population including offspring
        this.evaluate();
        // Remove less fit individuals
        this.cull();
        // Mutate survivors
        this.mutate();
        return this.individuals;
    }
}
