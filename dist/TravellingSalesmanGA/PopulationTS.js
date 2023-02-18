import { Population } from "../GA/index";
import { IndividualTS } from "./IndividualTS";
export class PopulationTS extends Population {
    constructor(individualCount, cities) {
        super(individualCount, cities.length, IndividualTS);
        this.cities = cities;
    }
    evaluate() {
        this.averageFitness = 0;
        for (let i = 0; i < this.individuals.length; i++) {
            this.individuals[i].fitness = 0;
            for (let j = 0; j < this.individualSize - 1; j++) {
                const city1 = this.cities[this.individuals[i].genes[j]];
                const city2 = this.cities[this.individuals[i].genes[j + 1]];
                const distance = Math.hypot(city2[0] - city1[0], city2[1] - city1[1]);
                this.individuals[i].fitness += distance;
            }
            const city1 = this.cities[this.individuals[i].genes[0]];
            const city2 = this.cities[this.individuals[i].genes[this.individualSize - 1]];
            const distance = Math.hypot(city2[0] - city1[0], city2[1] - city1[1]);
            this.individuals[i].fitness += distance;
            this.averageFitness += this.individuals[i].fitness;
        }
        this.averageFitness /= this.individuals.length;
        return this.individuals;
    }
    cull() {
        this.individuals.sort((a, b) => b.fitness - a.fitness);
        this.individuals.splice(0, this.individualCount);
    }
    mutate() {
        for (let i = 0; i < this.individualCount; i++) {
            if (Math.random() < 0.1) {
                let [rand1, rand2] = [
                    Math.floor(Math.random() * this.individualSize),
                    Math.floor(Math.random() * this.individualSize)
                ];
                while (rand1 == rand2) {
                    rand2 = Math.floor(Math.random() * this.individualSize);
                }
                [
                    this.individuals[i][rand1],
                    this.individuals[i][rand2]
                ] = [
                    this.individuals[i][rand2],
                    this.individuals[i][rand1]
                ];
            }
        }
        return this.individuals;
    }
}
