import React from "react";
import ReactDOM from "react-dom/client";
import Slider from "./Components/Slider/Slider";
import { HANDLE_SIZE, SLIDER_TYPE, VALUE_TYPE } from "./Types/enums";
import { v4 as uuidv4 } from "uuid";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Slider
            id={uuidv4()}
            width={300}
            sliderType={SLIDER_TYPE.CONTINUOUS}
            valueType={VALUE_TYPE.SINGLE}
            handleSize={HANDLE_SIZE.SIZE_24}
            minimumValue={10}
            maximumValue={20}
            discreteValues={[]}
        />
        <Slider
            id={uuidv4()}
            width={100}
            sliderType={SLIDER_TYPE.CONTINUOUS}
            valueType={VALUE_TYPE.SINGLE}
            handleSize={HANDLE_SIZE.SIZE_32}
            minimumValue={10}
            maximumValue={20}
            discreteValues={[]}
        />
    </React.StrictMode>
);
