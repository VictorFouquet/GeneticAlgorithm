# Genetic Algorithm

Provides Genetic Algorithm base classes and interfaces.

Genetic algorithms are used to solved problems that can be too hard or too expensive to solve in a deterministic way.

Their purpose is to mimic natural selection principles, by evolving a set of randomly generated solutions untill an optimal or almost optimal solution to the given problem does emerge.

The solutions set is regarded as a ```Population``` of ```Individuals``` storing ```Genes```.

- A first set of solutions is generated randomly
- Each individual is given a score - fitness, according to their performance in solving the problem
- Individuals are selected for mating with a probability relative to their fitness
- Mating individuals are selected as parents to create offsprings that crosses their genes
- A culling is performed to keep the population's size constant
- Remaining individuals are submitted to a mutation probability that might change their genome

## Content

### GA

Base interface and abstract classes for ```Population``` and ```Individual```.

Individuals are specific to the problem that is to be solved, so client classes must extend them and implement all the required methods.

Populations use individuals so some of its methods must also be implemented in client classes, namely ```cull```, ```evaluate``` and ```mutate```.

### Travelling Salesman

Provided example that extends both ```Population``` and ```Individual``` abstract classes to solve the [Travelling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem)

The solutions evolution and resolution of the problem can be interactively vizualised by opening the ```index.html``` file located in the repository's root folder.

## Development

### Requirement

```node``` and ```npm```

### Scripts

```npm install``` to install the required node modules

```npm run compile``` to transpile code from TypeScript to JavaScript and create a bundle. The bundle and JavaScript transpiled code will be stored in ```dist``` folder.

