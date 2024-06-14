# Input Slider by Devansh Dalmia

![File Explorer Logo made using AI](./logo.webp)

# Overview

The Input Slider Component is a React-based UI component designed to provide an interactive and customizable input slider. This component allows users to adjust values within a specified range or select from discrete values. The slider can be configured as either a single or range slider, supporting both continuous and discrete modes. It includes tooltips for precise value display and offers a smooth and intuitive user experience.

# Features

-   **Single or Range Slider**: Supports both single value and range selection.
-   **Continuous or Discrete Mode**: Choose between continuous values or a set of predefined discrete values.
-   **Customizable Handle Size**: Two handle sizes available for different use cases.
-   **Tooltips**: Display current values with optional symbols.
-   **Keyboard and Mouse Support**: Handles both mouse drag and keyboard arrow key adjustments.
-   **Stylish Design**: Customizable styles with SCSS.

# Special Features

-   **Sorting, Filtering**: You can choose to view your files and folders the way you want. Complete control. All options are available to work together

# Table of Contents

1. [Demo](#demo)
2. [Installation](#installation)
3. [Usage Guide](#usage-guide)
4. [Edge Cases](#edge-cases)
5. [Future Scope](#future-scope)
6. [Dependencies And Technology Stack](#dependencies-and-technology-stack)
7. [Contribution](#contribution)
8. [Authors](#authors)
9. [License](#license)

# Demo

[Live Demo](https://devansh-slider-component.netlify.app)
[Storybook](https://666bada6d4f93c3033bfc56e-qezeykyubb.chromatic.com/)

Please Note:

1. Use of Google Chrome is recommended.
2. Use on laptop/desktop for the best possible experience.

# Installation

## Prerequisites

Ensure you have the following installed:

-   Node.js (v14.x or later)<br/>
-   npm (v6.x or later) or yarn (v1.22.x or later)<br/>
-   A modern web browser (Chrome, Firefox, Edge, or Safari)

1. Clone the repo

    ```sh
    git clone https://github.com/devanshdalmia01/slider-component.git
    ```

2. Install NPM packages

    ```sh
    cd slider-component && npm install
    ```

3. Run

    ```sh
    npm run dev
    ```

4. Open http://localhost:5173/ to view it in the browser

# Usage Guide

## Importing the Component

To use the Custom Slider Component in your project, first import it:

```
import Slider from './path-to-slider/Slider';
```

## Basic Usage

Here is an example of how to implement a continuous single slider:

```
const [value, setValue] = useState(50);

<Slider
    id="example-slider"
    width={300}
    sliderType={SLIDER_TYPE.CONTINUOUS}
    valueType={VALUE_TYPE.SINGLE}
    handleSize={HANDLE_SIZE.SIZE_24}
    minimumValue={0}
    maximumValue={100}
    initialValue1={value}
    setValue1={setValue}
    tooltopSymbol="%"
/>
```
## Range Slider

For a continuous range slider:

```
const [value1, setValue1] = useState(20);
const [value2, setValue2] = useState(80);

<Slider
    id="range-slider"
    width={500}
    sliderType={SLIDER_TYPE.CONTINUOUS}
    valueType={VALUE_TYPE.RANGE}
    handleSize={HANDLE_SIZE.SIZE_24}
    minimumValue={0}
    maximumValue={200}
    initialValue1={value1}
    initialValue2={value2}
    setValue1={setValue1}
    setValue2={setValue2}
    tooltopSymbol=" $"
/>
```

# Edge Cases Handled

1. **Exceeding Boundaries**: Ensures handles cannot exceed the slider's minimum or maximum values.

2. **Value Overlap**: For range sliders, ensures the handles do not cross over each other.

3. **Invalid Initial Values**: Corrects any initial values that are out of bounds.

# Future Scope

1. **Mobile Support**: Enhance responsiveness and usability on mobile devices.

2. **Custom Themes**: Allow users to define their own color schemes and styles.

3. **Multiple Handles**: Support for sliders with more than two handles for advanced use cases.

# Dependencies And Technology Stack

-   [React.js](https://reactjs.org) - For building the user interface.
-   [React Tooltip](https://www.npmjs.com/package/react-tooltip) - For adding tooltips to increase user experience.
-   TypeScript - For type safety and better developer experience.
-   SCSS - For styling the component.

# Contribution

Contributions are welcome! Please fork the repository and submit pull requests to the main branch. For major changes, please open an issue first to discuss what you would like to change.

# Author

## Devansh Dalmia

-   [LinkedIn](https://www.linkedin.com/in/devanshdalmia1/)
-   [GitHub](https://github.com/devanshdalmia01/)
-   [Email](mailto:devanshdalmia1@gmail.com)

# License

[MIT](https://opensource.org/licenses/MIT)
