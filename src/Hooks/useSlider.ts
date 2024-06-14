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
        handlePositions1: number[] = [],
        handlePositions2: number[] = [];

    // Calculate positions for discrete values
    if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
        discreteValues.forEach((_: number, index: number) => {
            let totalSpaceAvailable: number = width - DOT_WIDTH.WIDTH_4 * discreteValues.length;
            let spaceBetween: number = totalSpaceAvailable / (2 * discreteValues.length);

            dotPositions.push(Number(((2 * index + 1) * spaceBetween).toFixed(0)));

            if (index === 0) {
                handlePositions1.push(Number(((2 * index + 1) * spaceBetween).toFixed(0)) + offset + 2);
            } else {
                handlePositions1.push(
                    Number(((2 * index + 1) * spaceBetween).toFixed(0)) + offset + 2 + index * DOT_WIDTH.WIDTH_4
                );
            }
        });

        handlePositions2 = handlePositions1.slice().reverse();
    }

    // Handle drag logic for first handle
    const handleDrag1 = useCallback(() => {
        let position: number = positionX1;

        const onMouseMove = (e: MouseEvent) => {
            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                if (valueType === VALUE_TYPE.RANGE) {
                    position = snapToDiscreteValue(
                        handlePositions1.filter((value: number) => value <= width - positionX2),
                        e.clientX
                    );
                } else {
                    position = snapToDiscreteValue(handlePositions1, e.clientX);
                }
            } else {
                let endCondition: number;

                if (valueType === VALUE_TYPE.RANGE) {
                    endCondition = width - positionX2;
                } else {
                    endCondition = width + offset;
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

    // Handle drag logic for second handle
    const handleDrag2 = useCallback(() => {
        let position: number = positionX2;

        const onMouseMove = (e: MouseEvent) => {
            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                position = snapToDiscreteValue(
                    handlePositions2.filter((value: number) => value <= width - positionX1),
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

    // Handle keyboard input for first handle
    const handleLeftRightKey1 = (e: React.KeyboardEvent) => {
        if (isFocused1) {
            let position: number = positionX1,
                endCondition: number;

            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                if (valueType === VALUE_TYPE.RANGE) {
                    endCondition =
                        handlePositions1.length -
                        handlePositions1.findIndex((value: number) => value === positionX2) -
                        2;
                } else {
                    endCondition = handlePositions1.length - 1;
                }

                let posIndex: number = handlePositions1.findIndex((value: number) => value === position);

                if (
                    !(
                        (posIndex === 0 && e.key === "ArrowLeft") ||
                        (posIndex === endCondition && e.key === "ArrowRight")
                    )
                ) {
                    if (e.key === "ArrowLeft") {
                        position = handlePositions1[posIndex - 1];
                    } else if (e.key === "ArrowRight") {
                        position = handlePositions1[posIndex + 1];
                    }
                }
            } else {
                if (e.key === "ArrowLeft") {
                    position -= 1;
                } else if (e.key === "ArrowRight") {
                    position += 1;
                }

                if (valueType === VALUE_TYPE.RANGE) {
                    endCondition = width - positionX2;
                } else {
                    endCondition = width + offset;
                }

                position = Math.max(offset, Math.min(position, endCondition));
            }

            setPositionX1(position);
        }
    };

    // Handle keyboard input for second handle
    const handleLeftRightKey2 = (e: React.KeyboardEvent) => {
        if (isFocused2) {
            let position: number = positionX2;

            if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
                let posIndex1: number = handlePositions1.findIndex((value: number) => value === positionX1);
                let posIndex2: number = handlePositions2.findIndex((value: number) => value === position);

                if (
                    !(
                        (posIndex2 === posIndex1 + 1 && e.key === "ArrowLeft") ||
                        (posIndex2 === handlePositions2.length - 1 && e.key === "ArrowRight")
                    )
                ) {
                    if (e.key === "ArrowLeft") {
                        position = handlePositions2[posIndex2 - 1];
                    } else if (e.key === "ArrowRight") {
                        position = handlePositions2[posIndex2 + 1];
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

    // Snap to the closest discrete value
    const snapToDiscreteValue = (positions: number[], currentPosition: number) => {
        let closestIndex: number = 0,
            smallestDifference: number = Math.abs(positions[0] - currentPosition);

        for (let i = 1; i < positions.length; i++) {
            let currentDifference: number = Math.abs(positions[i] - currentPosition);

            if (currentDifference < smallestDifference) {
                smallestDifference = currentDifference;
                closestIndex = i;
            }
        }

        return positions[closestIndex];
    };

    // Handle track click for single value slider
    const trackOnClick = (e: React.MouseEvent) => {
        const rect: DOMRect | undefined = document.querySelector(`#track-${id}`)?.getBoundingClientRect();

        if (rect && rect.x <= e.clientX && e.clientX <= rect.x + width) {
            setClickPos(e.clientX - rect.x + offset);
        }
    };

    useEffect(() => {
        if (sliderType === SLIDER_TYPE.DISCRETE && discreteValues && discreteValues.length) {
            setPositionX1(snapToDiscreteValue(handlePositions1, clickPos));
        } else {
            setPositionX1(Math.max(offset, Math.min(clickPos, width + offset)));
        }
    }, [clickPos]);

    return {
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
    };
};

export default useSlider;
