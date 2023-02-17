import { _Individual } from "./interface/Individual.interface";

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