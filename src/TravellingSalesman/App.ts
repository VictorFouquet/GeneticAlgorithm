import { IndividualTS } from "./IndividualTS";
import { PopulationTS } from "./PopulationTS";
import { Renderer } from "./Renderer";


export class App {
    canvasID:   string         // Id of the canvas used to render
    cityCount:  number;        // Number of cities to create
    cities:     number[][];    // Cities coordinates
    renderer:   Renderer       // Renderer used to vizualise evolution
    population: PopulationTS;  // Population to evolve
    
    constructor(canvasID: string, cityCount: number) {
        this.renderer = new Renderer(canvasID);
        this.cityCount = cityCount;
    }

    /** Initializes application, creating cities and population */
    init(): void {
        this.createCities();
        this.createPopulation();
    }

    /** Creates cities with random coordinates in canvas limits */
    createCities(): void {
        this.cities = []
        for (let i = 0; i < 20; i++) {
            this.cities.push([
                Math.floor(Math.random() * this.renderer.canvas.width),
                Math.floor(Math.random() * this.renderer.canvas.height)
            ])
        }
    }

    /** Creates and spawn a population, hardcoded to 750 individuals */
    createPopulation(): void {
        this.population = new PopulationTS(750, this.cities);
        this.population.spawn();
    }

    /**
     * Converts an individual genome to a list of cities to link with lines
     * @param individual Individual to convert to a city pairs array
     * @returns city pairs array
     */
    individualToCityArray(individual: IndividualTS): number[][] {
        const citiesCoords: number[][] = [];

        for (let i = 1; i < individual.size; i++) {
            citiesCoords.push([
                ...this.cities[individual.genes[i]],
                ...this.cities[individual.genes[i-1]]
            ])
        }
        citiesCoords.push([
            ...this.cities[individual.genes[0]],
            ...this.cities[individual.genes[individual.size-1]]
        ])

        return citiesCoords;
    }

    /** Evolves the population and render new generation */
    update(): void {
        console.log(this.population)
        this.population.generate();
        this.renderer.clear();
        
        const genes: number[][] = [];
        for (let j = 0; j < this.population.individualCount; j++) {
            const individual: IndividualTS = this.population.individuals[j];
            genes.push(...this.individualToCityArray(individual));
        }
        this.renderer.drawGenes(genes);

        const best: IndividualTS = this.population.individuals.sort((a,b) => b.fitness - a.fitness)[0];
        const bestGenes: number[][] = this.individualToCityArray(best)
        this.renderer.drawFittest(bestGenes);

        this.renderer.drawCities(this.cities);
    }

    /** Updates population and render it every 250ms */
    run(): void {
        this.init();
        window.setInterval(_ => this.update(), 250);
    }
}
