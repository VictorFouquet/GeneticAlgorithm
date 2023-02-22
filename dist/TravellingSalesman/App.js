import { PopulationTS } from "./GeneticAlgorithm/PopulationTS";
import { GUI } from "./GUI/GUI";
import { config } from "./GUI/GUIConfig";
export class App {
    /**
     * Main app class to solve and render Travelling Salesman Problem
     * @param cityCount number of cities
     * @param popSize number of individual in population
     * @param mutationRate population's mutation rate
     */
    constructor(cityCount, popSize, mutationRate) {
        this.cityCount = cityCount;
        this.popSize = popSize;
        this.isPlaying = false;
        this.mutationRate = mutationRate;
        this.gui = new GUI(() => this.run(), // Evolve button handler
        () => this.resetCities(), // Reset city button handler
        () => this.resetPopulation(), // Reset population button handler
        (count) => this.updateCities(count), this.cityCount, // City input handler
        (count) => this.updatePopulation(count), this.popSize, // Individual input handler
        (rate) => this.updateMutation(rate), this.mutationRate // Mutation rate input handler
        );
        this.init();
    }
    /** Initializes application, creating cities and population */
    init() {
        this.createCities();
        this.gui.displayCities(this.cities);
        this.createPopulation();
    }
    /** Creates cities with random coordinates in canvas limits */
    createCities() {
        const padding = 30;
        this.cities = [];
        for (let i = 0; i < this.cityCount; i++) {
            this.cities.push(this.gui.sampleCanvas(config.pathCanvasId, padding));
        }
    }
    /**
     * Sets cities count, creates or destroy cities accordingly, and updates GUI
     * @param count new number of cities
     */
    updateCities(count = this.cityCount) {
        // Creates or destroy cities to match new city count
        if (this.cities.length < count) {
            for (let i = this.cities.length; i < count; i++) {
                this.cities.push([
                    Math.floor(Math.random() * this.gui.pathCanvasHandler.width),
                    Math.floor(Math.random() * this.gui.pathCanvasHandler.height)
                ]);
            }
        }
        else {
            this.cities.splice(count);
        }
        // Updates properties related to cities
        this.cityCount = count;
        this.population.cities = this.cities;
        // Updates and display cities in GUI
        this.gui.clearCanvases();
        this.gui.clearStatistics();
        this.gui.updateCities(this.cities.length);
        this.gui.displayCities(this.cities);
        // Creates a new population to solve for new set of cities
        this.createPopulation();
    }
    /** Destroys previous cities, creates new set and updates GUI */
    resetCities() {
        this.createCities();
        this.gui.updateCities(this.cities.length);
        this.gui.clearStatistics();
        this.gui.clearCanvases();
        this.gui.displayCities(this.cities);
        this.createPopulation();
    }
    /** Creates and spawn a population */
    createPopulation() {
        this.population = new PopulationTS(this.popSize, this.cities, this.mutationRate);
        this.population.spawn();
    }
    /**
     * Updates population size, creates new population accordingly and updates GUI
     * @param count new number of individuals
     */
    updatePopulation(count) {
        this.popSize = count;
        this.createPopulation();
        this.gui.updateIndividuals(this.popSize);
        this.gui.clearStatistics();
    }
    /** Resets population's individuals and updates GUI */
    resetPopulation() {
        this.createPopulation();
        this.gui.clearCanvases();
        this.gui.displayCities(this.cities);
        this.gui.clearStatistics();
    }
    /**
     * Converts an individual's genes to a list of cities
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
    /**
     * Updates population's mutation rate and GUI accodringly
     * @param rate new mutation rate
     */
    updateMutation(rate) {
        this.population.mutationRate = rate;
        this.gui.updateMutation(rate);
        this.gui.clearStatistics();
    }
    /** Gets and formats population data for display and GUI update */
    getPopulationData() {
        // Stores individuals' genes as city coordinates      
        const genes = [];
        for (let j = 0; j < this.population.individualCount; j++) {
            const individual = this.population.individuals[j];
            genes.push(...this.individualToCityArray(individual));
        }
        // Gets best individual data
        const bestIndividual = this.population.individuals.sort((a, b) => b.fitness - a.fitness)[0];
        const bestGenes = this.individualToCityArray(bestIndividual);
        const bestFitness = bestIndividual.fitness;
        // Get fitnesses from spawn and max fitness
        const fitnesses = [...this.population.averageFitnesses];
        const maxFit = Math.max(...fitnesses);
        return {
            genes: genes,
            bestGenes: bestGenes,
            avgFitnesses: fitnesses,
            maxFitness: maxFit,
            bestFitness: bestFitness
        };
    }
    /** Evolves the population and render new generation */
    evolve() {
        if (this.isPlaying == false) {
            clearInterval(this.rendererInterval);
            return;
        }
        // Creates new generation and get new population data
        this.population.generate();
        const popData = this.getPopulationData();
        for (let i = 0; i < popData.avgFitnesses.length; i++) {
            popData.avgFitnesses[i] /= popData.maxFitness;
        }
        // Updates GUI and display data
        this.gui.clearCanvases();
        this.gui.displayAverageFitnesses(popData.avgFitnesses);
        this.gui.displayPopulation(popData.genes);
        this.gui.displayFittest(popData.bestGenes);
        this.gui.displayCities(this.cities);
        this.gui.updateGeneration(this.population.generation);
        this.gui.updateShortest(popData.bestFitness);
        // Checks if evolution and animation should be stopped
        if (this.population.noImprovementCount >= 20 && this.isPlaying) {
            clearInterval(this.rendererInterval);
            this.isPlaying = false;
        }
    }
    /** Evolves population and render it every 250ms */
    run() {
        this.isPlaying = true;
        this.population.noImprovementCount = 0;
        this.rendererInterval = window.setInterval(_ => this.evolve(), 250);
    }
}
