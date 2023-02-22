
export type PopulationData = {
    genes:        number[][], // Current generation genes, formatted as city coordinates
    bestGenes:    number[][], // Best genes in current population
    avgFitnesses: number[],   // Average fitnesses since spawn
    maxFitness:   number,     // Max - or worst - fitness since spawn
    bestFitness:  number      // Best fitness since spawn
}