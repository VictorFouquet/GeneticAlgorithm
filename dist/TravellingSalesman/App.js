import { PopulationTS } from "./PopulationTS";
import { Renderer } from "./Renderer";
export class App {
    constructor(canvasID, cityCount) {
        this.renderer = new Renderer(canvasID);
        this.cityCount = cityCount;
    }
    /** Initializes application, creating cities and population */
    init() {
        this.createCities();
        this.createPopulation();
    }
    /** Creates cities with random coordinates in canvas limits */
    createCities() {
        this.cities = [];
        for (let i = 0; i < this.cityCount; i++) {
            this.cities.push([
                Math.floor(Math.random() * this.renderer.canvas.width),
                Math.floor(Math.random() * this.renderer.canvas.height)
            ]);
        }
    }
    /** Creates and spawn a population, hardcoded to 750 individuals */
    createPopulation() {
        this.population = new PopulationTS(750, this.cities);
        this.population.spawn();
    }
    /**
     * Converts an individual genome to a list of cities to link with lines
     * @param individual Individual to convert to a city pairs array
     * @returns city pairs array
     */
    individualToCityArray(individual) {
        const citiesCoords = [];
        for (let i = 1; i < individual.size; i++) {
            citiesCoords.push([
                ...this.cities[individual.genes[i]],
                ...this.cities[individual.genes[i - 1]]
            ]);
        }
        citiesCoords.push([
            ...this.cities[individual.genes[0]],
            ...this.cities[individual.genes[individual.size - 1]]
        ]);
        return citiesCoords;
    }
    /** Evolves the population and render new generation */
    update() {
        console.log(this.population);
        this.population.generate();
        this.renderer.clear();
        const genes = [];
        for (let j = 0; j < this.population.individualCount; j++) {
            const individual = this.population.individuals[j];
            genes.push(...this.individualToCityArray(individual));
        }
        this.renderer.drawGenes(genes);
        const best = this.population.individuals.sort((a, b) => b.fitness - a.fitness)[0];
        const bestGenes = this.individualToCityArray(best);
        this.renderer.drawFittest(bestGenes);
        this.renderer.drawCities(this.cities);
    }
    /** Updates population and render it every 250ms */
    run() {
        this.init();
        window.setInterval(_ => this.update(), 250);
    }
}
