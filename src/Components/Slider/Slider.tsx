import { FC, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { SliderInfo } from "../../Types/interfaces";
import useSlider from "../../Hooks/useSlider";
import { SLIDER_TYPE, VALUE_TYPE } from "../../Types/enums";
import { Tooltip } from "react-tooltip";
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
}) => {
    const {
        offset,
        positionX1,
        positionX2,
        dotPositions,
        handlePositions,
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
        if (valueType === VALUE_TYPE.SINGLE) {
            if (sliderType === SLIDER_TYPE.CONTINUOUS && maximumValue !== undefined && minimumValue !== undefined) {
                const value: number = Number(
                    ((positionX1 - offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                setValue1(value);
                setTooltipValue1(value?.toString());
            } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                const valueIndex: number = handlePositions.findIndex((value: number) => positionX1 === value);
                setValue1(discreteValues[valueIndex]);
                setTooltipValue1(discreteValues[valueIndex]?.toString());
            }
        } else {
            if (
                sliderType === SLIDER_TYPE.CONTINUOUS &&
                maximumValue !== undefined &&
                minimumValue !== undefined &&
                setValue2 !== undefined
            ) {
                const value: number = Number(
                    ((positionX1 - offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                const value2: number = Number(
                    ((width - positionX2 + offset) * ((maximumValue - minimumValue) / width)).toFixed(2)
                );
                setValue1(value);
                setValue2(value2);
                setTooltipValue1(value?.toString());
                setTooltipValue2(value2?.toString());
            } else if (
                sliderType === SLIDER_TYPE.DISCRETE &&
                discreteValues &&
                discreteValues.length &&
                setValue2 !== undefined
            ) {
                const valueIndex: number = handlePositions.findIndex((value: number) => positionX1 === value);
                const valueIndex2: number = handlePositions.findIndex(
                    (value: number) => width - positionX2 + 2 * offset === value
                );
                setValue1(discreteValues[valueIndex]);
                setValue2(discreteValues[valueIndex2]);
                setTooltipValue1(discreteValues[valueIndex]?.toString());
                setTooltipValue2(discreteValues[valueIndex2]?.toString());
            }
        }
    }, [positionX1, positionX2]);

    useEffect(() => {
        if (valueType === VALUE_TYPE.SINGLE) {
            if (sliderType === SLIDER_TYPE.CONTINUOUS && maximumValue !== undefined && minimumValue !== undefined) {
                setPositionX1(offset + initialValue1 * (width / (maximumValue - minimumValue)));
            } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let initialValueIndex: number = discreteValues.findIndex((value: number) => initialValue1 === value);
                if (initialValueIndex === -1) {
                    initialValueIndex = 0;
                }
                setPositionX1(handlePositions[initialValueIndex]);
            }
        } else {
            if (
                sliderType === SLIDER_TYPE.CONTINUOUS &&
                maximumValue !== undefined &&
                minimumValue !== undefined &&
                initialValue2 !== undefined
            ) {
                setPositionX1(offset + initialValue1 * (width / (maximumValue - minimumValue)));
                setPositionX2(width - (initialValue2 * (width / (maximumValue - minimumValue)) - offset));
            } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let initialValueIndex: number = discreteValues.findIndex((value: number) => initialValue1 === value);
                let initialValueIndex2: number = discreteValues.findIndex((value: number) => initialValue2 === value);
                if (initialValueIndex === -1) {
                    initialValueIndex = 0;
                }
                if (initialValueIndex2 === -1) {
                    initialValueIndex2 = discreteValues.length - 1;
                }
                setPositionX1(handlePositions[initialValueIndex]);
                setPositionX2(handlePositions[discreteValues.length - 1 - initialValueIndex2]);
            }
        }
    }, [offset]);
    return (
        <div
            className="slider"
            style={{
                width: `${width + (valueType === VALUE_TYPE.SINGLE ? handleSize : 2 * handleSize)}px`,
                height: `${handleSize}px`,
            }}
        >
            <Tooltip id={`tooltip-1-${id}`} />
            <div
                className={`handle handle${handleSize}`}
                id={`handle-1-${id}`}
                style={{ left: `${positionX1}px` }}
                onFocus={() => setIsFocused1(true)}
                onBlur={() => setIsFocused1(false)}
                tabIndex={0}
                onKeyDown={(e: KeyboardEvent) => handleLeftRightKey1(e)}
                onMouseDown={handleDrag1}
                data-tooltip-id={`tooltip-1-${id}`}
                data-tooltip-content={tooltipValue1}
            >
                <div className={`subhandle subhandle${handleSize}`} />
            </div>
            <div
                className="track"
                id={`track-${id}`}
                style={{ width: `${width}px` }}
                onClick={(e: MouseEvent) => (valueType === VALUE_TYPE.SINGLE ? trackOnClick(e) : "")}
            >
                {sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length
                    ? dotPositions.map((position: number, index: number) => (
                          <div key={index} className="dot" style={{ left: `${position}px` }} />
                      ))
                    : ""}
            </div>
            {valueType === VALUE_TYPE.RANGE ? (
                <>
                    <Tooltip id={`tooltip-2-${id}`} />
                    <div
                        className={`handle handle${handleSize}`}
                        id={`handle-2-${id}`}
                        style={{ right: `${positionX2}px` }}
                        onFocus={() => setIsFocused2(true)}
                        onBlur={() => setIsFocused2(false)}
                        tabIndex={0}
                        onKeyDown={(e: KeyboardEvent) => handleLeftRightKey2(e)}
                        onMouseDown={handleDrag2}
                        data-tooltip-id={`tooltip-2-${id}`}
                        data-tooltip-content={tooltipValue2}
                    >
                        <div className={`subhandle subhandle${handleSize}`} />
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default Slider;
