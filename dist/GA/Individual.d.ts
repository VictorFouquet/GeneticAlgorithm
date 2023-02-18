import { _Individual } from "./interface/Individual.interface";
/**
 * Abstract class used to generate, store and cross DNA.
 * All its method must be implemented in child class.
 */
export declare abstract class Individual<T> implements _Individual<T> {
    size: number;
    fitness: number;
    probability: number;
    genes: T[];
    constructor(size: number);
    abstract random(): void;
    abstract crossover(mate: Individual<T>): T[][];
}
