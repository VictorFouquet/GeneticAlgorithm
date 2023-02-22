import { GUIConfig } from "../types/GUIConfig.type"
import { _CanvasHandler } from "./CanvasHandler.interface"
import { _ButtonHandler } from "./ButtonHandler.interface"
import { _InputHandler } from "./InputHandler.interface"

export interface _GUI {
    config: GUIConfig
    // Canvases handlers
    pathCanvasHandler:        _CanvasHandler
    fitnessCanvasHandler:     _CanvasHandler
    // Buttons handlers
    evolveBtnHandler:         _ButtonHandler
    resetCitiesBtnHandler:    _ButtonHandler
    resetPopBtnHandler:       _ButtonHandler
    // Inputs handlers
    cityInputHandler:         _InputHandler
    individualInputHandler:   _InputHandler
    mutationRateInputHandler: _InputHandler
    // Statistics divs
    generationCountStat:      HTMLDivElement
    shortestPathStat:         HTMLDivElement
}