import { Chromosome } from "../GA/index";
export class ChromosomeTS extends Chromosome {
    random() {
        const indices = [];
        for (let i = 0; i < this.size; i++) {
            indices.push(i);
        }
        for (let i = 0; i < this.size; i++) {
            this.genes[i] = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
        }
    }
    crossover(mate) {
        const genes1 = [];
        const genes2 = [];
        const pivot = Math.min(this.size - 2, Math.max(Math.floor(Math.random() * this.size), 1));
        const selectedValues = [];
        for (let i = 0; i < pivot; i++) {
            genes1.push(this.genes[i]);
            selectedValues.push(this.genes[i]);
        }
        for (let i = 0; i < this.size; i++) {
            if (selectedValues.includes(mate.genes[i]))
                continue;
            genes1.push(mate.genes[i]);
        }
        genes2.push(...mate.genes.filter(g => selectedValues.includes(g)));
        for (let i = pivot; i < this.size; i++) {
            genes2.push(this.genes[i]);
        }
        return [genes1, genes2];
    }
}
