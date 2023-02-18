import { Individual } from "../GA/index";
/**
 * Individual representing a set sequence of cities index
 */
export class IndividualTS extends Individual {
    /**
     * Creates individual genes randomly picking unique values in range [0..nCities]
     */
    random() {
        // Creates range of indices
        const indices = [];
        for (let i = 0; i < this.size; i++) {
            indices.push(i);
        }
        for (let i = 0; i < this.size; i++) {
            // Splice random index from range and store it in genes array
            this.genes[i] = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
        }
    }
    /**
     * Creates two offspring sets of genes crossing two indivduals
     * @param mate Individual to cross over with
     * @returns two sets of genes
     */
    crossover(mate) {
        const genes1 = [];
        const genes2 = [];
        // Randomly choose pivot in range [1..nCities-2]
        const pivot = Math.min(this.size - 2, Math.max(Math.floor(Math.random() * this.size), 1));
        const selectedValues = this.genes.slice(0, pivot);
        // Select values from [0...pivot] in this Individual's genes
        // to fill first part of genes1
        genes1.push(...selectedValues);
        // Select remaining values in mate genes preserving their order
        // to fill second part of genes1
        genes1.push(...mate.genes.filter(g => !selectedValues.includes(g)));
        // Select the genes selected in first part of genes1 preserving their order in mate genes
        // to fill first part of genes2 
        genes2.push(...mate.genes.filter(g => selectedValues.includes(g)));
        // Select values from [pivot...size] in the mate's genes
        // to fill second part of genes2
        genes2.push(...this.genes.slice(pivot, this.size));
        return [genes1, genes2];
    }
}
