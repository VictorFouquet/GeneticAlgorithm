import { _Individual } from "./interface/Individual.interface";

/**
 * Abstract class used to generate, store and cross DNA.
 * All its method must be implemented in child class.
 */
export abstract class Individual<T> implements _Individual<T> {
    size: number;
    fitness: number;
    probability: number;
    genes: T[];

    constructor(size: number) {
        this.size  = size;
        this.genes = [];
    }

    abstract random(): void

    abstract crossover(mate: Individual<T>): T[][]
}