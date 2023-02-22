import { _Individual } from './Individual.interface';

/**
 * A population creates, stores and evolves individuals.
 * 
 * Individuals are specifics to the problems that are to be solved,
 * so are the methods to evaluate, cross or rank the individuals.
 * Child classes should either implement the _Population interface,
 * or extend the Population abstract class.
 * 
 * The extended Individual class with constrained gene type must be
 * provided in client class declaration, for instance:
 * 
 *    class IndividualClient extends Individual<number> 
 *    ...
 *    class PopulationClient extends Population<IndividualClient>
 *      or
 *    class PopulationClient implements _Population<IndividualClient>
 */
export interface _Population<T extends _Individual<any>> {
    individuals:     T[]           // Individuals composing the population
    individualCount:  number        // Number of individuals in the population
    individualSize:   number        // Number of genes for each individual
    mutationRate:     number        // Probability for an individual to mutate
    generation:       number        // Number of generations since spawn
    bestFitness:      number        // Best fitness for one generation
    averageFitness:   number        // Average fitness for one generation
    averageFitnesses: number[]      // Average fitnesses stored since spawn
    IndividualClass:  { new(): T }  // Individual constructor

    spawn():               T[]     // Creates first generation of individuals
    evaluate():            T[]     // Computes fitness for each individual
    pick():                T       // Picks an individual according to probability
    select(count: number): T[][]   // Selects fittest individuals for mating
    crossover():           T[]     // Creates offspring from current generation 
    mutate():              T[]     // Mutates current individuals
    cull():                void    // Culls population to keep best individuals
    generate():            T[]     // Wrapper function, creates new generation
}