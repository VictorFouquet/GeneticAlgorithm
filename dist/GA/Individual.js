/**
 * Abstract class used to generate, store and cross DNA.
 * All its method must be implemented in child class.
 */
export class Individual {
    constructor(size) {
        this.size = size;
        this.genes = [];
    }
}
