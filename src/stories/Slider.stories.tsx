import type { Meta, StoryObj } from "@storybook/react";
import Slider from "../Components/Slider/Slider";
import { HANDLE_SIZE, SLIDER_TYPE, VALUE_TYPE } from "../Types/enums";
import { useState } from "react";

const meta: Meta<typeof Slider> = {
    component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Continous Single Slider
export const ContinousSingleSlider: Story = {
    args: {
        id: "continous-single-slider",
        width: 200,
        sliderType: SLIDER_TYPE.CONTINUOUS,
        valueType: VALUE_TYPE.SINGLE,
        handleSize: HANDLE_SIZE.SIZE_24,
        minimumValue: 0,
        maximumValue: 100,
        initialValue1: 25,
        tooltopSymbol: "%",
    },
    render: function Render(args) {
        const [opacity, setOpacity] = useState<number>(0);
        return (
            <>
                <div className="headings" style={{ width: "200px" }}>
                    <h1>Opacity</h1>
                    <h3>{opacity}%</h3>
                </div>
                <Slider {...args} setValue1={setOpacity} />
            </>
        );
    },
};

// Continous Range Slider
export const ContinousRangeSlider: Story = {
    args: {
        id: "continous-range-slider",
        width: 500,
        sliderType: SLIDER_TYPE.CONTINUOUS,
        valueType: VALUE_TYPE.RANGE,
        handleSize: HANDLE_SIZE.SIZE_24,
        minimumValue: 0,
        maximumValue: 200,
        initialValue1: 40,
        initialValue2: 80,
        tooltopSymbol: " $",
    },
    render: function Render(args) {
        const [priceLow, setPriceLow] = useState<number>(0);
        const [priceHigh, setPriceHigh] = useState<number>(0);
        return (
            <>
                <div className="headings" style={{ width: "500px" }}>
                    <h1>Price</h1>
                    <h3>
                        {priceLow} $&nbsp;&nbsp;-&nbsp;&nbsp;{priceHigh} $
                    </h3>
                </div>
                <Slider {...args} setValue1={setPriceLow} setValue2={setPriceHigh} />
            </>
        );
    },
};

// Discrete Single Slider
export const DiscreteSingleSlider: Story = {
    args: {
        id: "discrete-single-slider",
        width: 190,
        sliderType: SLIDER_TYPE.DISCRETE,
        valueType: VALUE_TYPE.SINGLE,
        handleSize: HANDLE_SIZE.SIZE_24,
        initialValue1: 40,
        discreteValues: [0, 10, 40, 45, 50, 55, 60],
    },
    render: function Render(args) {
        const [minutes, setMinutes] = useState<number>(0);
        return (
            <>
                <div className="headings" style={{ width: "190px" }}>
                    <h1>Time</h1>
                    <h3>{minutes} mins</h3>
                </div>
                <Slider {...args} setValue1={setMinutes} />
            </>
        );
    },
};

// Discrete Range Slider
export const DiscreteRangeSlider: Story = {
    args: {
        id: "discrete-range-slider",
        width: 390,
        sliderType: SLIDER_TYPE.DISCRETE,
        valueType: VALUE_TYPE.RANGE,
        handleSize: HANDLE_SIZE.SIZE_24,
        initialValue1: 20,
        initialValue2: 45,
        discreteValues: [0, 10, 20, 30, 40, 45, 55, 60],
    },
    render: function Render(args) {
        const [minutesLow, setMinutesLow] = useState<number>(0);
        const [minutesHigh, setMinutesHigh] = useState<number>(0);
        return (
            <>
                <div className="headings" style={{ width: "390px" }}>
                    <h1>Time 2</h1>
                    <h3>
                        {minutesLow} mins&nbsp;&nbsp;-&nbsp;&nbsp;{minutesHigh} mins
                    </h3>
                </div>
                <Slider {...args} setValue1={setMinutesLow} setValue2={setMinutesHigh} />
            </>
        );
    },
};
