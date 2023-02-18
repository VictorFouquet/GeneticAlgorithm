import { Population } from "../GA/index";
import { IndividualTS } from "./IndividualTS";
export declare class PopulationTS extends Population<IndividualTS> {
    cities: number[][];
    constructor(individualCount: number, cities: number[][]);
    evaluate(): IndividualTS[];
    cull(): void;
    mutate(): IndividualTS[];
}
