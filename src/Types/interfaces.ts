import { HANDLE_SIZE, SLIDER_TYPE, VALUE_TYPE } from "./enums";

export interface SliderInfo {
    id: string;
    width: number;
    sliderType: SLIDER_TYPE;
    valueType: VALUE_TYPE;
    handleSize: HANDLE_SIZE;
    minimumValue?: number;
    maximumValue?: number;
    discreteValues?: number[];
}
