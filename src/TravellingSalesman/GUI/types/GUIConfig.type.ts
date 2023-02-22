
export type GUIConfig = {
    // Buttons ids
    evolveBtnId:          string,
    resetCitiesBtnId:     string,
    resetPopBtnId:        string,
    // Range inputs ids
    cityInputId:          string,
    individualInputId:    string,
    mutationRateInputId:  string
    // Canvases ids
    pathCanvasId:         string,
    fitnessCanvasId:      string,
    // Statistics ids
    shortestPathId:       string,
    generationCountId:    string,
    // Canvases style
    cityFill:             string,
    popStrokeStyle:       string,
    fittestStrokeStyle:   string,
    clearStyle:           string,
    fitnessesStrokeColor: string,
    fitnessesFillColor:   string,
    circleRadius:         number
}
