import { Individual } from "../GA/index";
export declare class IndividualTS extends Individual<number> {
    random(): void;
    crossover(mate: IndividualTS): number[][];
}
