import { FC, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { SliderInfo } from "../../Types/interfaces";
import useSlider from "../../Hooks/useSlider";
import { SLIDER_TYPE, VALUE_TYPE } from "../../Types/enums";
import { Tooltip } from "react-tooltip";
import "./Slider.css";

const Slider: FC<SliderInfo> = ({
    id,
    width,
    sliderType,
    valueType,
    handleSize,
    minimumValue,
    maximumValue,
    initialValue,
    initialValue2,
    setValue,
    setValue2,
    discreteValues,
}) => {
    const {
        offset,
        positionX,
        positionX2,
        dotPositions,
        handlePositions,
        setId,
        setOffset,
        setPositionX,
        setPositionX2,
        setIsFocused,
        setIsFocused2,
        handleDrag,
        handleDrag2,
        handleLeftRightKey,
        handleLeftRightKey2,
        trackOnClick,
    } = useSlider(width, sliderType, valueType, discreteValues);

    const [tooltipValue, setTooltipValue] = useState<string>("");
    const [tooltipValue2, setTooltipValue2] = useState<string>("");

    useEffect(() => {
        setId(id);
        setOffset(handleSize / 2);
    }, []);

    useEffect(() => {
        if (valueType === VALUE_TYPE.SINGLE) {
            if (sliderType === SLIDER_TYPE.CONTINUOUS && maximumValue !== undefined && minimumValue !== undefined) {
                const value: number = Number(
                    ((positionX - offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                setValue(value);
                setTooltipValue(value?.toString());
            } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                const valueIndex: number = handlePositions.findIndex((value: number) => positionX === value);
                setValue(discreteValues[valueIndex]);
                setTooltipValue(discreteValues[valueIndex]?.toString());
            }
        } else {
            if (
                sliderType === SLIDER_TYPE.CONTINUOUS &&
                maximumValue !== undefined &&
                minimumValue !== undefined &&
                setValue2 !== undefined
            ) {
                const value: number = Number(
                    ((positionX - offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                const value2: number = Number(
                    ((width - positionX2 + offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                setValue(value);
                setValue2(value2);
                setTooltipValue(value?.toString());
                setTooltipValue2(value2?.toString());
            } else if (
                sliderType === SLIDER_TYPE.DISCRETE &&
                discreteValues &&
                discreteValues.length &&
                setValue2 !== undefined
            ) {
                const valueIndex: number = handlePositions.findIndex((value: number) => positionX === value);
                const valueIndex2: number = handlePositions.findIndex(
                    (value: number) => width - positionX2 + 2 * offset === value
                );
                setValue(discreteValues[valueIndex]);
                setValue2(discreteValues[valueIndex2]);
                setTooltipValue(discreteValues[valueIndex]?.toString());
                setTooltipValue2(discreteValues[valueIndex2]?.toString());
            }
        }
    }, [positionX, positionX2]);

    useEffect(() => {
        if (valueType === VALUE_TYPE.SINGLE) {
            if (sliderType === SLIDER_TYPE.CONTINUOUS && maximumValue !== undefined && minimumValue !== undefined) {
                setPositionX(offset + initialValue * (width / (maximumValue - minimumValue)));
            } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let initialValueIndex: number = discreteValues.findIndex((value: number) => initialValue === value);
                if (initialValueIndex === -1) {
                    initialValueIndex = 0;
                }
                setPositionX(handlePositions[initialValueIndex]);
            }
        } else {
            if (
                sliderType === SLIDER_TYPE.CONTINUOUS &&
                maximumValue !== undefined &&
                minimumValue !== undefined &&
                initialValue2 !== undefined
            ) {
                setPositionX(offset + initialValue * (width / (maximumValue - minimumValue)));
                setPositionX2(width - (initialValue2 * (width / (maximumValue - minimumValue)) - offset));
            } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let initialValueIndex: number = discreteValues.findIndex((value: number) => initialValue === value);
                let initialValueIndex2: number = discreteValues.findIndex((value: number) => initialValue2 === value);
                if (initialValueIndex === -1) {
                    initialValueIndex = 0;
                }
                if (initialValueIndex2 === -1) {
                    initialValueIndex2 = discreteValues.length - 1;
                }
                setPositionX(handlePositions[initialValueIndex]);
                setPositionX2(handlePositions[discreteValues.length - 1 - initialValueIndex2]);
            }
        }
    }, [offset]);

    return valueType === VALUE_TYPE.SINGLE ? (
        <div
            className="slider"
            style={{
                width: `${width + handleSize}px`,
                height: `${handleSize}px`,
            }}
        >
            <Tooltip id={`tooltip-${id}`} />
            <div
                data-tooltip-id={`tooltip-${id}`}
                data-tooltip-content={tooltipValue}
                id={`handle-${id}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                tabIndex={0}
                onKeyDown={(e: KeyboardEvent) => handleLeftRightKey(e)}
                onMouseDown={handleDrag}
                className={`handle${handleSize}`}
                style={{ position: "relative", left: `${positionX}px` }}
            >
                <div className={`subhandle${handleSize}`} />
            </div>
            <div
                onClick={(e: MouseEvent) => trackOnClick(e)}
                id={`track-${id}`}
                style={{ width: `${width}px` }}
                className="track"
            >
                {sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length
                    ? dotPositions.map((position: number, index: number) => (
                          <div key={index} className="dot" style={{ left: `${position}px` }} />
                      ))
                    : ""}
            </div>
        </div>
    ) : (
        <div
            className="slider"
            style={{
                width: `${width + 2 * handleSize}px`,
                height: `${handleSize}px`,
            }}
        >
            <Tooltip id={`tooltip-1-${id}`} />
            <div
                data-tooltip-id={`tooltip-1-${id}`}
                data-tooltip-content={tooltipValue}
                id={`handle-1-${id}`}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                tabIndex={0}
                onKeyDown={(e: KeyboardEvent) => handleLeftRightKey(e)}
                onMouseDown={handleDrag}
                className={`handle${handleSize}`}
                style={{ position: "relative", left: `${positionX}px` }}
            >
                <div className={`subhandle${handleSize}`} />
            </div>
            <div id={`track-${id}`} style={{ width: `${width}px` }} className="track">
                {sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length
                    ? dotPositions.map((position: number, index: number) => (
                          <div key={index} className="dot" style={{ left: `${position}px` }} />
                      ))
                    : ""}
            </div>
            <Tooltip id={`tooltip-2-${id}`} />
            <div
                data-tooltip-id={`tooltip-2-${id}`}
                data-tooltip-content={tooltipValue2}
                id={`handle-2-${id}`}
                onFocus={() => setIsFocused2(true)}
                onBlur={() => setIsFocused2(false)}
                tabIndex={1}
                onKeyDown={(e: KeyboardEvent) => handleLeftRightKey2(e)}
                onMouseDown={handleDrag2}
                className={`handle${handleSize}`}
                style={{ position: "relative", right: `${positionX2}px` }}
            >
                <div className={`subhandle${handleSize}`} />
            </div>
        </div>
    );
};

export default Slider;
