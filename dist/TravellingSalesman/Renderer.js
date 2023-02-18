export class Renderer {
    /**
     * Instantiates a renderer
     * @param canvasId Id of the canvas used to render
     */
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvasW = this.canvas.width;
        this.canvasH = this.canvas.height;
        this.cityRadius = 5;
        this.cityFill = "white";
        this.cityStroke = "white";
        this.geneStroke = "rgba(125,180,255,0.1)";
        this.fittestStroke = "blue";
        this.strokeStyle = this.geneStroke;
        this.lineWidth = 1;
    }
    /** Clears canvas */
    clear() {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
    }
    /**
     * Draws a line between two city points
     * @param x1 x coord of first city
     * @param y1 y coord of first city
     * @param x2 x coord of second city
     * @param y2 y coord of second city
     */
    drawLine(x1, y1, x2, y2) {
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
    }
    /**
     * Draws a circle to render a city
     * @param x x coordinate of city
     * @param y y coordinate of city
     * @param r radius of city
     */
    drawCircle(x, y, r) {
        this.ctx.moveTo(x + r, y);
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
    }
    /**
     * Draws all lines formed by fittest pairs of points
     * @param genes genes composing the individual
     */
    drawFittest(genes) {
        this.lineWidth = 5;
        this.strokeStyle = this.fittestStroke;
        this.drawGenes(genes);
        this.strokeStyle = this.geneStroke;
        this.lineWidth = 1;
    }
    /**
     * Draws all lines formed by pair of points
     * @param genes genes composing the whole population
     */
    drawGenes(genes) {
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        for (let i = 0; i < genes.length; i++) {
            this.drawLine(genes[i][0], genes[i][1], genes[i][2], genes[i][3]);
        }
        this.ctx.stroke();
    }
    /**
     * Draws an array of cities
     * @param cities cities to render
     */
    drawCities(cities) {
        this.ctx.fillStyle = this.cityFill;
        this.ctx.strokeStyle = this.cityStroke;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        for (let i = 0; i < cities.length; i++) {
            this.drawCircle(cities[i][0], cities[i][1], this.cityRadius);
        }
        this.ctx.fill();
        this.ctx.stroke();
    }
}
