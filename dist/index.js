import { App } from "./TravellingSalesman/App";
function main() {
    const CITY_COUNT = 15;
    const INDIVIDUAL_COUNT = 300;
    const MUTATION_RATE = 0.1;
    const app = new App(CITY_COUNT, INDIVIDUAL_COUNT, MUTATION_RATE);
}
main();
