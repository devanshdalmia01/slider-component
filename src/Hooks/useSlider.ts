import React, { useState, useEffect, useCallback } from "react";
import { SLIDER_TYPE, DOT_WIDTH, VALUE_TYPE } from "../Types/enums";

const useSlider = (width: number, sliderType: SLIDER_TYPE, valueType: VALUE_TYPE, discreteValues?: number[]) => {
    const [id, setId] = useState<string>("");
    const [clickPos, setClickPos] = useState<number>(0);
    const [offset, setOffset] = useState<number>(0);
    const [positionX1, setPositionX1] = useState<number>(0);
    const [positionX2, setPositionX2] = useState<number>(0);
    const [isFocused1, setIsFocused1] = useState<boolean>(false);
    const [isFocused2, setIsFocused2] = useState<boolean>(false);

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

    const handleDrag1 = useCallback(() => {
        let position = positionX1;
        const onMouseMove = (e: MouseEvent) => {
            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                position = snapToDiscreteValue(handlePositions, e.clientX);
                if (valueType === VALUE_TYPE.RANGE) {
                    position = snapToDiscreteValue(
                        handlePositions.filter((value) => value < width - positionX2),
                        e.clientX
                    );
                }
            } else {
                let endCondition = width + offset;
                if (valueType === VALUE_TYPE.RANGE) {
                    endCondition = width - positionX2;
                }
                position += e.movementX;
                position = Math.max(offset, Math.min(position, endCondition));
            }
            setPositionX1(position);
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }, [positionX1, positionX2]);

    const handleDrag2 = useCallback(() => {
        let position = positionX2;
        const onMouseMove = (e: MouseEvent) => {
            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                position = snapToDiscreteValue(
                    handlePositions.filter((value) => value < width - positionX1),
                    width - e.clientX
                );
            } else {
                position -= e.movementX;
                position = Math.max(offset, Math.min(position, width - positionX1));
            }
            setPositionX2(position);
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }, [positionX2, positionX1]);

    const handleLeftRightKey1 = (e: React.KeyboardEvent) => {
        if (isFocused1) {
            let position = positionX1;
            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let endCondition = handlePositions.length - 1;
                if (valueType === VALUE_TYPE.RANGE) {
                    endCondition =
                        handlePositions.length - handlePositions.findIndex((value) => value === positionX2) - 2;
                }
                let posIndex = handlePositions.findIndex((value) => value === position);
                if (
                    !(
                        (posIndex === 0 && e.key === "ArrowLeft") ||
                        (posIndex === endCondition && e.key === "ArrowRight")
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
                let endCondition = width + offset;
                if (valueType === VALUE_TYPE.RANGE) {
                    endCondition = width - positionX2;
                }
                position = Math.max(offset, Math.min(position, endCondition));
            }
            setPositionX1(position);
        }
    };

    const handleLeftRightKey2 = (e: React.KeyboardEvent) => {
        if (isFocused2) {
            let position = positionX2;
            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let posIndex1 = handlePositions.findIndex((value) => value === positionX1);
                let posIndex2 = handlePositions.length - 1 - handlePositions.findIndex((value) => value === positionX2);
                if (
                    !(
                        (posIndex2 === posIndex1 + 1 && e.key === "ArrowLeft") ||
                        (posIndex2 === handlePositions.length - 1 && e.key === "ArrowRight")
                    )
                ) {
                    if (e.key === "ArrowLeft") {
                        position = handlePositions[handlePositions.length - posIndex2];
                    } else if (e.key === "ArrowRight") {
                        position = handlePositions[handlePositions.length - posIndex2 - 2];
                    }
                }
            } else {
                if (e.key === "ArrowLeft") {
                    position += 1;
                } else if (e.key === "ArrowRight") {
                    position -= 1;
                }
                position = Math.max(offset, Math.min(position, width - positionX1));
            }
            setPositionX2(position);
        }
    };

    const snapToDiscreteValue = (positions: number[], currentPosition: number) => {
        let closestIndex = 0;
        let smallestDifference = Math.abs(positions[0] - currentPosition);

        for (let i = 1; i < positions.length; i++) {
            let currentDifference = Math.abs(positions[i] - currentPosition);

            if (currentDifference < smallestDifference) {
                smallestDifference = currentDifference;
                closestIndex = i;
            }
        }
        return positions[closestIndex];
    };

    const trackOnClick = (e: React.MouseEvent) => {
        const rect = document.querySelector(`#track-${id}`)?.getBoundingClientRect();
        if (rect && rect.x <= e.clientX && e.clientX <= rect.x + width) {
            setClickPos(e.clientX - rect.x + offset);
        }
    };

    useEffect(() => {
        if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
            setPositionX1(snapToDiscreteValue(handlePositions, clickPos));
        } else {
            setPositionX1(Math.max(offset, Math.min(clickPos, width + offset)));
        }
    }, [clickPos]);

    return {
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
    };
};

export default useSlider;
