import { HANDLE_SIZE, SLIDER_TYPE, VALUE_TYPE } from "./enums";
import { Dispatch, SetStateAction, KeyboardEvent, MouseEvent } from "react";

// Interface for Slider component props
export interface SliderInfo {
    id: string; // Unique Id for the slider
    width: number; // Width of the slider track
    sliderType: SLIDER_TYPE; // Type of slider (continuous or discrete)
    valueType: VALUE_TYPE; // Type of value (single or range)
    handleSize: HANDLE_SIZE; // Size of the slider handle
    minimumValue?: number; // Minimum value for the slider (for continuous type)
    maximumValue?: number; // Maximum value for the slider (for continuous type)
    initialValue1: number; // Initial value for the first handle
    initialValue2?: number; // Initial value for the second handle (for range type)
    setValue1: Dispatch<SetStateAction<number>>; // State setter for the first handle value
    setValue2?: Dispatch<SetStateAction<number>>; // State setter for the second handle value (for range type)
    discreteValues?: number[]; // Array of discrete values (for discrete type)
    tooltopSymbol?: string; // Symbol you want to show after value
}

// Interface for Handle component props
export interface HandleProps {
    id: string; // Unique Id for the handle
    position: number; // Position of the handle
    handleSize: number; // Size of the handle
    tooltipValue: string; // Tooltip value to display
    setIsFocused: (focused: boolean) => void; // Function to set focus state
    handleKeyDown: (e: KeyboardEvent) => void; // Function to handle keydown events
    handleMouseDown: (e: MouseEvent) => void; // Function to handle mousedown events
    isRight?: boolean; // Boolean value to check if the handle starts from right
}
