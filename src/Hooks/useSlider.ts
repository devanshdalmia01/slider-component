import React, { useState, useEffect, useRef, useCallback } from "react";

const useSlider = (width: number) => {
    const [id, setId] = useState<string>("");
    const [clickPos, setClickPos] = useState<number>(0);
    const [positionX, setPositionX] = useState<number>(1);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const elementRef = useRef<HTMLDivElement>(null);

    const handleDrag = useCallback(() => {
        let position = positionX;
        const onMouseMove = (e: MouseEvent) => {
            position += e.movementX;
            position = Math.max(1, Math.min(position, width));
            if (elementRef.current) {
                elementRef.current.style.transform = `translate(${position}px, 0px)`;
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

    useEffect(() => {
        if (clickPos !== 0) {
            if (elementRef.current) {
                elementRef.current.style.transform = `translate(${Math.max(1, Math.min(clickPos, width))}px, 0px)`;
            }
            setPositionX(Math.max(1, Math.min(clickPos, width)));
        }
    }, [clickPos]);

    const handleOnClick = (e: React.MouseEvent) => {
        if (document.getElementById(id)?.contains(<Node>e!.target)) {
            setIsFocused((prev) => !prev);
        } else {
            setIsFocused(false);
        }
    };

    const trackOnClick = (e: React.MouseEvent) => {
        const rect = document.querySelector(`#track${id}`)?.getBoundingClientRect();
        if (rect && rect.x <= e.clientX && e.clientX <= rect.x + width) {
            setClickPos(e.clientX - rect.x);
        }
    };

    const handleLeftRightKey = (e: React.KeyboardEvent) => {
        if (isFocused) {
            let position = positionX;
            if (e.key === "ArrowLeft") {
                position -= 1;
            } else if (e.key === "ArrowRight") {
                position += 1;
            }
            position = Math.max(1, Math.min(position, width));
            if (elementRef.current) {
                elementRef.current.style.transform = `translate(${position}px, 0px)`;
            }
            setPositionX(position);
        }
    };

    return {
        isFocused,
        elementRef,
        setId,
        handleDrag,
        handleOnClick,
        trackOnClick,
        handleLeftRightKey,
    };
};

export default useSlider;
