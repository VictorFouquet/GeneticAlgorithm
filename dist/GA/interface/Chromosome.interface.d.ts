export interface _Chromosome<T> {
    genes: T[];
    size: number;
    fitness: number;
    probability: number;
    random(): void;
    crossover(mate: _Chromosome<T>): T[][];
}
