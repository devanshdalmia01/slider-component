import { useState, FC } from "react";
import Slider from "../Components/Slider/Slider";
import { HANDLE_SIZE, SLIDER_TYPE, VALUE_TYPE } from "../Types/enums";

const Home: FC = () => {
    const [opacity, setOpacity] = useState<number>(0);
    const [exposure, setExposure] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [priceLow, setPriceLow] = useState<number>(0);
    const [priceHigh, setPriceHigh] = useState<number>(0);
    const [minutesLow, setMinutesLow] = useState<number>(0);
    const [minutesHigh, setMinutesHigh] = useState<number>(0);
    return (
        <>
            <div className="headings" style={{ width: "200px" }}>
                <h1>Opacity</h1>
                <h3>{opacity}</h3>
            </div>
            <Slider
                id={"opacity-slider"}
                width={200}
                sliderType={SLIDER_TYPE.CONTINUOUS}
                valueType={VALUE_TYPE.SINGLE}
                handleSize={HANDLE_SIZE.SIZE_24}
                minimumValue={0}
                maximumValue={100}
                initialValue={25}
                setValue={setOpacity}
            />
            <div className="headings" style={{ width: "300px" }}>
                <h1>Exposure</h1>
                <h3>{exposure}</h3>
            </div>
            <Slider
                id={"exposure-slider"}
                width={300}
                sliderType={SLIDER_TYPE.CONTINUOUS}
                valueType={VALUE_TYPE.SINGLE}
                handleSize={HANDLE_SIZE.SIZE_32}
                minimumValue={0}
                maximumValue={3}
                initialValue={1}
                setValue={setExposure}
            />
            <div className="headings" style={{ width: "400px" }}>
                <h1>Expense</h1>
                <h3>{expense}</h3>
            </div>
            <Slider
                id={"expense-slider"}
                width={400}
                sliderType={SLIDER_TYPE.CONTINUOUS}
                valueType={VALUE_TYPE.SINGLE}
                handleSize={HANDLE_SIZE.SIZE_24}
                minimumValue={0}
                maximumValue={200}
                initialValue={100}
                setValue={setExpense}
            />
            <div className="headings" style={{ width: "190px" }}>
                <h1>Time</h1>
                <h3>{minutes}</h3>
            </div>
            <Slider
                id={"time-slider"}
                width={190}
                sliderType={SLIDER_TYPE.DISCRETE}
                valueType={VALUE_TYPE.SINGLE}
                handleSize={HANDLE_SIZE.SIZE_24}
                initialValue={40}
                setValue={setMinutes}
                discreteValues={[0, 10, 40, 45, 50, 55, 60]}
            />
            <div className="headings" style={{ width: "500px" }}>
                <h1>Price</h1>
                <h3>
                    {priceLow}&nbsp;&nbsp;-&nbsp;&nbsp;{priceHigh}
                </h3>
            </div>
            <Slider
                id={"price-slider"}
                width={500}
                sliderType={SLIDER_TYPE.CONTINUOUS}
                valueType={VALUE_TYPE.RANGE}
                handleSize={HANDLE_SIZE.SIZE_24}
                minimumValue={0}
                maximumValue={200}
                initialValue={40}
                initialValue2={80}
                setValue={setPriceLow}
                setValue2={setPriceHigh}
            />
            <div className="headings" style={{ width: "390px" }}>
                <h1>Time 2</h1>
                <h3>
                    {minutesLow}&nbsp;&nbsp;-&nbsp;&nbsp;{minutesHigh}
                </h3>
            </div>
            <Slider
                id={"time-slider-2"}
                width={390}
                sliderType={SLIDER_TYPE.DISCRETE}
                valueType={VALUE_TYPE.RANGE}
                handleSize={HANDLE_SIZE.SIZE_24}
                initialValue={20}
                initialValue2={45}
                setValue={setMinutesLow}
                setValue2={setMinutesHigh}
                discreteValues={[0, 10, 20, 30, 40, 45, 50, 55, 60]}
            />
        </>
    );
};

export default Home;
