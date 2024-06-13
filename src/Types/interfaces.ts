import { HANDLE_SIZE, SLIDER_TYPE, VALUE_TYPE } from "./enums";
import { Dispatch, SetStateAction } from "react";

export interface SliderInfo {
    id: string;
    width: number;
    sliderType: SLIDER_TYPE;
    valueType: VALUE_TYPE;
    handleSize: HANDLE_SIZE;
    minimumValue?: number;
    maximumValue?: number;
    initialValue: number;
    initialValue2?: number;
    setValue: Dispatch<SetStateAction<number>>;
    setValue2?: Dispatch<SetStateAction<number>>;
    discreteValues?: number[];
}
