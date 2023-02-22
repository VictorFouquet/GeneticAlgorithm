import { GUIConfig } from "../types/GUIConfig.type";
import { _CanvasHandler } from "./CanvasHandler.interface";
import { _ButtonHandler } from "./ButtonHandler.interface";
import { _InputHandler } from "./InputHandler.interface";
export interface _GUI {
    config: GUIConfig;
    pathCanvasHandler: _CanvasHandler;
    fitnessCanvasHandler: _CanvasHandler;
    evolveBtnHandler: _ButtonHandler;
    resetCitiesBtnHandler: _ButtonHandler;
    resetPopBtnHandler: _ButtonHandler;
    cityInputHandler: _InputHandler;
    individualInputHandler: _InputHandler;
    mutationRateInputHandler: _InputHandler;
    generationCountStat: HTMLDivElement;
    shortestPathStat: HTMLDivElement;
}
