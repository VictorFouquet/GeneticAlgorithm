import { App } from "./TravellingSalesman/App";

function main(): void {
    const CITY_COUNT:       number = 15;
    const INDIVIDUAL_COUNT: number = 300;
    const MUTATION_RATE:    number = 0.1
    const app: App = new App(CITY_COUNT, INDIVIDUAL_COUNT, MUTATION_RATE);
}

main();
