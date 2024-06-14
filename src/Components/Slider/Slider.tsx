import { FC, MouseEvent, useEffect, useState } from "react";
import { SliderInfo } from "../../Types/interfaces";
import useSlider from "../../Hooks/useSlider";
import { SLIDER_TYPE, VALUE_TYPE } from "../../Types/enums";
import Handle from "../Handle/Handle";
import "./Slider.scss";

const Slider: FC<SliderInfo> = ({
    id,
    width,
    sliderType,
    valueType,
    handleSize,
    minimumValue,
    maximumValue,
    initialValue1,
    initialValue2,
    setValue1,
    setValue2,
    discreteValues,
    tooltopSymbol,
}) => {
    // Custom hook to handle slider logic
    const {
        offset,
        positionX1,
        positionX2,
        dotPositions,
        handlePositions1,
        handlePositions2,
        setId,
        setOffset,
        setPositionX1,
        setPositionX2,
        setIsFocused1,
        setIsFocused2,
        handleDrag1,
        handleDrag2,
        handleLeftRightKey1,
        handleLeftRightKey2,
        trackOnClick,
    } = useSlider(width, sliderType, valueType, discreteValues);

    const [tooltipValue1, setTooltipValue1] = useState<string>("");
    const [tooltipValue2, setTooltipValue2] = useState<string>("");

    useEffect(() => {
        setId(id);
        setOffset(handleSize / 2);
    }, []);

    useEffect(() => {
        // Update tooltip and value for single slider
        if (valueType === VALUE_TYPE.SINGLE) {
            if (
                sliderType === SLIDER_TYPE.CONTINUOUS &&
                maximumValue !== undefined &&
                minimumValue !== undefined &&
                setValue1 !== undefined
            ) {
                const value1: number = Number(
                    ((positionX1 - offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                setValue1(value1);
                setTooltipValue1(value1?.toString());
            } else if (
                sliderType === SLIDER_TYPE.DISCRETE &&
                discreteValues &&
                discreteValues.length &&
                setValue1 !== undefined
            ) {
                const valueIndex1: number = handlePositions1.findIndex((value: number) => positionX1 === value);
                setValue1(discreteValues[valueIndex1]);
                setTooltipValue1(discreteValues[valueIndex1]?.toString());
            }
            // Update tooltip and values for range slider
        } else {
            if (
                sliderType === SLIDER_TYPE.CONTINUOUS &&
                maximumValue !== undefined &&
                minimumValue !== undefined &&
                setValue1 !== undefined &&
                setValue2 !== undefined
            ) {
                const value1: number = Number(
                    ((positionX1 - offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                const value2: number = Number(
                    ((width - positionX2 + offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                setValue1(value1);
                setValue2(value2);
                setTooltipValue1(value1?.toString());
                setTooltipValue2(value2?.toString());
            } else if (
                sliderType === SLIDER_TYPE.DISCRETE &&
                discreteValues &&
                discreteValues.length &&
                setValue1 !== undefined &&
                setValue2 !== undefined
            ) {
                const valueIndex1: number = handlePositions1.findIndex((value: number) => positionX1 === value);
                const valueIndex2: number = handlePositions2.findIndex((value: number) => positionX2 === value);
                setValue1(discreteValues[valueIndex1]);
                setValue2(discreteValues[valueIndex2]);
                setTooltipValue1(discreteValues[valueIndex1]?.toString());
                setTooltipValue2(discreteValues[valueIndex2]?.toString());
            }
        }
    }, [positionX1, positionX2]);

    useEffect(() => {
        // Set initial positions of handles
        if (valueType === VALUE_TYPE.SINGLE) {
            if (sliderType === SLIDER_TYPE.CONTINUOUS && maximumValue !== undefined && minimumValue !== undefined) {
                setPositionX1(offset + initialValue1 * (width / (maximumValue - minimumValue)));
            } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let initialValueIndex1: number = discreteValues.findIndex((value: number) => initialValue1 === value);
                if (initialValueIndex1 === -1) {
                    initialValueIndex1 = 0;
                }
                setPositionX1(handlePositions1[initialValueIndex1]);
            }
        } else {
            if (
                sliderType === SLIDER_TYPE.CONTINUOUS &&
                maximumValue !== undefined &&
                minimumValue !== undefined &&
                initialValue2 !== undefined
            ) {
                setPositionX1(offset + initialValue1 * (width / (maximumValue - minimumValue)));
                setPositionX2(width + offset - initialValue2 * (width / (maximumValue - minimumValue)));
            } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let initialValueIndex1: number = discreteValues.findIndex((value: number) => initialValue1 === value);
                let initialValueIndex2: number = discreteValues.findIndex((value: number) => initialValue2 === value);
                if (initialValueIndex1 === -1) {
                    initialValueIndex1 = 0;
                }
                if (initialValueIndex2 === -1) {
                    initialValueIndex2 = discreteValues.length - 1;
                }
                setPositionX1(handlePositions1[initialValueIndex1]);
                setPositionX2(handlePositions2[initialValueIndex2]);
            }
        }
    }, [offset]);
    return (
        <>
            <div
                className="slider"
                style={{
                    width: `${width + (valueType === VALUE_TYPE.SINGLE ? handleSize : 2 * handleSize)}px`,
                    height: `${handleSize}px`,
                }}
            >
                <Handle
                    id={`1-${id}`}
                    position={positionX1}
                    handleSize={handleSize}
                    tooltipValue={`${tooltipValue1}${tooltopSymbol ? tooltopSymbol : ""}`}
                    setIsFocused={setIsFocused1}
                    handleKeyDown={handleLeftRightKey1}
                    handleMouseDown={handleDrag1}
                />
                <div
                    className="track"
                    id={`track-${id}`}
                    style={{
                        width: `${width}px`,
                        background:
                            valueType === VALUE_TYPE.RANGE
                                ? `linear-gradient(to right, #f2f3f5 0px, #f2f3f5 ${positionX1}px, #47b647 ${positionX1}px ${width - positionX2}px, #f2f3f5 ${width - positionX2}px 100%)`
                                : `linear-gradient(to right, #47b647 ${(positionX1 / width) * 100}%, #f2f3f5 ${(positionX1 / width) * 100}%)`,
                    }}
                    onClick={(e: MouseEvent) => (valueType === VALUE_TYPE.SINGLE ? trackOnClick(e) : "")}
                >
                    {sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length
                        ? dotPositions.map((position: number, index: number) => (
                              <div
                                  key={index}
                                  className="dot"
                                  style={{
                                      left: `${position}px`,
                                      backgroundColor:
                                          valueType === VALUE_TYPE.RANGE
                                              ? `${position < positionX1 - offset || position > width - positionX2 + offset ? "#47b647" : "white"}`
                                              : `${position < positionX1 - offset ? "white" : "#47b647"}`,
                                  }}
                              />
                          ))
                        : ""}
                </div>
                {valueType === VALUE_TYPE.RANGE ? (
                    <Handle
                        id={`2-${id}`}
                        position={positionX2}
                        handleSize={handleSize}
                        tooltipValue={`${tooltipValue2}${tooltopSymbol ? tooltopSymbol : ""}`}
                        setIsFocused={setIsFocused2}
                        handleKeyDown={handleLeftRightKey2}
                        handleMouseDown={handleDrag2}
                        isRight={true}
                    />
                ) : (
                    ""
                )}
            </div>
            {sliderType === SLIDER_TYPE.CONTINUOUS ? (
                <div
                    className="belowValues"
                    style={{
                        width: `${width}px`,
                    }}
                >
                    <span
                        style={{
                            color: `${minimumValue === Number(tooltipValue1) ? "#47b647" : "black"}`,
                        }}
                    >
                        {minimumValue}
                    </span>
                    <span
                        style={{
                            color:
                                valueType === VALUE_TYPE.RANGE
                                    ? `${maximumValue === Number(tooltipValue2) ? "#47b647" : "black"}`
                                    : `${maximumValue === Number(tooltipValue1) ? "#47b647" : "black"}`,
                        }}
                    >
                        {maximumValue}
                    </span>
                </div>
            ) : (
                <div
                    className="belowValues"
                    style={{
                        width: `${width}px`,
                        justifyContent: "space-around",
                    }}
                >
                    {discreteValues &&
                        discreteValues.map((value: number, index: number) => {
                            return (
                                <span
                                    key={index}
                                    style={{
                                        color:
                                            valueType === VALUE_TYPE.RANGE
                                                ? `${
                                                      value === Number(tooltipValue1) || value === Number(tooltipValue2)
                                                          ? "#47b647"
                                                          : "black"
                                                  }`
                                                : `${value === Number(tooltipValue1) ? "#47b647" : "black"}`,
                                    }}
                                >
                                    {value}
                                </span>
                            );
                        })}
                </div>
            )}
        </>
    );
};

export default Slider;
