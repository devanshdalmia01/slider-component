import { FC, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { SliderInfo } from "../../Types/interfaces";
import useSlider from "../../Hooks/useSlider";
import { SLIDER_TYPE } from "../../Types/enums";
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
    setValue,
    discreteValues,
}) => {
    const {
        offset,
        positionX,
        dotPositions,
        handlePositions,
        setId,
        setOffset,
        setPositionX,
        setIsFocused,
        handleDrag,
        handleLeftRightKey,
        trackOnClick,
    } = useSlider(width, sliderType, discreteValues);

    const [tooltipValue, setTooltipValue] = useState<string>("");

    useEffect(() => {
        setId(id);
        setOffset(handleSize / 2);
    }, []);

    useEffect(() => {
        if (sliderType === SLIDER_TYPE.CONTINUOUS && maximumValue !== undefined && minimumValue !== undefined) {
            const value: number = Number(((positionX - offset) * ((maximumValue - minimumValue) / width)).toFixed(2));
            setValue(value);
            setTooltipValue(value?.toString());
        } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
            const valueIndex: number = handlePositions.findIndex((value: number) => positionX === value);
            setValue(discreteValues[valueIndex]);
            setTooltipValue(discreteValues[valueIndex]?.toString());
        }
    }, [positionX]);

    useEffect(() => {
        if (sliderType === SLIDER_TYPE.CONTINUOUS && maximumValue !== undefined && minimumValue !== undefined) {
            setPositionX(offset + initialValue * (width / (maximumValue - minimumValue)));
        } else if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
            let initialValueIndex: number = discreteValues.findIndex((value: number) => initialValue === value);
            if (initialValueIndex === -1) {
                initialValueIndex = 0;
            }
            setPositionX(handlePositions[initialValueIndex]);
        }
    }, [offset]);
    return (
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
    );
};

export default Slider;
