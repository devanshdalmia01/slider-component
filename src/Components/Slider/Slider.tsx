import { FC, KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { SliderInfo } from "../../Types/interfaces";
import useSlider from "../../Hooks/useSlider";
import { HANDLE_SIZE } from "../../Types/enums";
import "./Slider.css";

const Slider: FC<SliderInfo> = ({
    id,
    width,
    // sliderType,
    // valueType,
    handleSize,
    // minimumValue,
    // maximumValue,
    // discreteValues,
}) => {
    const { isFocused, elementRef, setId, handleDrag, handleOnClick, trackOnClick, handleLeftRightKey } =
        useSlider(width);
    const [trackPos, setTrackPos] = useState<number>(0);

    useEffect(() => {
        setId(id);
    });

    useEffect(() => {
        if (handleSize === HANDLE_SIZE.SIZE_24) {
            if (isFocused) {
                setTrackPos(14);
            } else {
                setTrackPos(16);
            }
        } else {
            if (isFocused) {
                setTrackPos(18);
            } else {
                setTrackPos(20);
            }
        }
    }, [isFocused, handleSize]);
    return (
        <div
            className="slider"
            style={{
                width: `${width + handleSize + 4}px`,
                height: `${handleSize + 4}px`,
            }}
        >
            <div
                id={id}
                onClick={(e: MouseEvent) => handleOnClick(e)}
                ref={elementRef}
                tabIndex={0}
                onKeyDown={(e: KeyboardEvent) => handleLeftRightKey(e)}
                onMouseDown={handleDrag}
                className={`handle${handleSize}${isFocused ? ` focused${handleSize}` : ""}`}
                style={{ position: "relative", left: `${trackPos}px` }}
            >
                <div className={`subhandle${handleSize}`} />
            </div>
            <div
                onClick={(e: MouseEvent) => trackOnClick(e)}
                id={`track${id}`}
                style={{ width: `${width}px` }}
                className="track"
            />
        </div>
    );
};

export default Slider;
