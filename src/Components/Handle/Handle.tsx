import { FC } from "react";
import { Tooltip } from "react-tooltip";
import { HandleProps } from "../../Types/interfaces";
import "./Handle.scss";

const Handle: FC<HandleProps> = ({
    id,
    position,
    handleSize,
    tooltipValue,
    setIsFocused,
    handleKeyDown,
    handleMouseDown,
    isRight,
}) => {
    return (
        <>
            <Tooltip id={`tooltip-${id}`} />
            <div
                className={`handle handle${handleSize}`}
                id={`handle-${id}`}
                style={isRight ? { right: `${position}px` } : { left: `${position}px` }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onMouseDown={handleMouseDown}
                data-tooltip-id={`tooltip-${id}`}
                data-tooltip-content={tooltipValue}
            >
                <div className={`subhandle subhandle${handleSize}`} />
            </div>
        </>
    );
};

export default Handle;
