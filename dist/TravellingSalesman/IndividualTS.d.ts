import { Individual } from "../GA/index";
/**
 * Individual representing a set sequence of cities index
 */
export declare class IndividualTS extends Individual<number> {
    /**
     * Creates individual genes randomly picking unique values in range [0..nCities]
     */
    random(): void;
    /**
     * Creates two offspring sets of genes crossing two indivduals
     * @param mate Individual to cross over with
     * @returns two sets of genes
     */
    crossover(mate: IndividualTS): number[][];
}
