import { Chromosome } from "../GA/index";
export declare class ChromosomeTS extends Chromosome<number> {
    random(): void;
    crossover(mate: ChromosomeTS): number[][];
}
