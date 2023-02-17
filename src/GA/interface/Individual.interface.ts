/**
 * An Individual is used to create, store and update encoded genes or DNA.
 * 
 * Individuals are specific to every problem that might be solved by a genetic algorithm,
 * so client classes must extend Individual abstract class according to their specific usecase.
 *
 * Client classes must provide the type given to the genes in their declaration, for instance :
 *   class IndividualClient extends Individual<number>
 */
export interface _Individual<T> {
    genes:       T[]      // Genes composing the individual
    size:        number   // Number of genes
    fitness:     number   // Fitness or score
    probability: number   // Probability to get selected for mating

    random():    void                      // Creates random genes for the individual
    crossover(mate: _Individual<T>): T[][] // Generates 2 individual sets of genes from parents
}
