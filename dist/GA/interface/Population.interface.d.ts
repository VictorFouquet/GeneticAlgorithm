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
    individuals: T[];
    individualCount: number;
    individualSize: number;
    mutationRate: number;
    generation: number;
    bestFitness: number;
    averageFitness: number;
    averageFitnesses: number[];
    IndividualClass: {
        new (): T;
    };
    spawn(): T[];
    evaluate(): T[];
    pick(): T;
    select(count: number): T[][];
    crossover(): T[];
    mutate(): T[];
    cull(): void;
    generate(): T[];
}
