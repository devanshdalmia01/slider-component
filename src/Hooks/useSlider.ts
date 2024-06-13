import React, { useState, useEffect, useCallback } from "react";
import { SLIDER_TYPE, DOT_WIDTH } from "../Types/enums";

const useSlider = (width: number, sliderType: SLIDER_TYPE, discreteValues?: number[]) => {
    const [id, setId] = useState<string>("");
    const [clickPos, setClickPos] = useState<number>(0);
    const [positionX, setPositionX] = useState<number>(0);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    let dotPositions: number[] = [],
        handlePositions: number[] = [];

    if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
        discreteValues.forEach((_, index) => {
            let totalSpaceAvailable: number = width - DOT_WIDTH.WIDTH_4 * discreteValues.length;
            let spaceBetween = totalSpaceAvailable / (2 * discreteValues.length);
            dotPositions.push(Number(((2 * index + 1) * spaceBetween).toFixed(0)));
            if (index === 0) {
                handlePositions.push(Number(((2 * index + 1) * spaceBetween).toFixed(0)) + offset + 2);
            } else {
                handlePositions.push(
                    Number(((2 * index + 1) * spaceBetween).toFixed(0)) + offset + 2 + index * DOT_WIDTH.WIDTH_4
                );
            }
        });
    }

    const handleDrag = useCallback(() => {
        let position = positionX;
        const onMouseMove = (e: MouseEvent) => {
            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                position = snapToDiscreteValue(e.clientX);
            } else {
                position += e.movementX;
                position = Math.max(offset, Math.min(position, width + offset));
            }
            setPositionX(position);
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }, [positionX]);

    const snapToDiscreteValue = (position: number) => {
        let closestIndex = 0;
        let smallestDifference = Math.abs(handlePositions[0] - position);

        for (let i = 1; i < handlePositions.length; i++) {
            let currentDifference = Math.abs(handlePositions[i] - position);

            if (currentDifference < smallestDifference) {
                smallestDifference = currentDifference;
                closestIndex = i;
            }
        }
        return handlePositions[closestIndex];
    };

    useEffect(() => {
        if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
            setPositionX(snapToDiscreteValue(clickPos));
        } else {
            setPositionX(Math.max(offset, Math.min(clickPos, width + offset)));
        }
    }, [clickPos]);

    const trackOnClick = (e: React.MouseEvent) => {
        const rect = document.querySelector(`#track-${id}`)?.getBoundingClientRect();
        if (rect && rect.x <= e.clientX && e.clientX <= rect.x + width) {
            setClickPos(e.clientX - rect.x + offset);
        }
    };

    const handleLeftRightKey = (e: React.KeyboardEvent) => {
        if (isFocused) {
            let position = positionX;
            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let posIndex = handlePositions.findIndex((value) => value === position);
                if (
                    !(
                        (posIndex === 0 && e.key === "ArrowLeft") ||
                        (posIndex === handlePositions.length - 1 && e.key === "ArrowRight")
                    )
                ) {
                    if (e.key === "ArrowLeft") {
                        position = handlePositions[posIndex - 1];
                    } else if (e.key === "ArrowRight") {
                        position = handlePositions[posIndex + 1];
                    }
                }
            } else {
                if (e.key === "ArrowLeft") {
                    position -= 1;
                } else if (e.key === "ArrowRight") {
                    position += 1;
                }
                position = Math.max(offset, Math.min(position, width + offset));
            }
            setPositionX(position);
        }
    };

    return {
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
    };
};

export default useSlider;
