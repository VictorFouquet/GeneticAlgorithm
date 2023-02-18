import { _Chromosome } from "./interface/Chromosome.interface";
export declare abstract class Chromosome<T> implements _Chromosome<T> {
    size: number;
    fitness: number;
    probability: number;
    genes: T[];
    constructor(size: number);
    abstract random(): void;
    abstract crossover(mate: Chromosome<T>): T[][];
}
