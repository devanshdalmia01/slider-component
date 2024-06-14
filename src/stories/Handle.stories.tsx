import type { Meta, StoryObj } from "@storybook/react";
import Handle from "../Components/Handle/Handle";
import { HANDLE_SIZE } from "../Types/enums";

const meta: Meta<typeof Handle> = {
    component: Handle,
};

export default meta;
type Story = StoryObj<typeof Handle>;

// Normal handle size 24
export const NormalSize24: Story = {
    args: {
        id: "normal-handle-24",
        position: 50,
        handleSize: HANDLE_SIZE.SIZE_24,
        tooltipValue: "50",
        isRight: false,
    },
};

// Hover handle size 24
export const HoverSize24: Story = {
    args: {
        id: "hover-handle-24",
        position: 50,
        handleSize: HANDLE_SIZE.SIZE_24,
        tooltipValue: "50",
        isRight: false,
    },
    parameters: {
        pseudo: { hover: true },
    },
};

// Focused handle size 24
export const FocusedSize24: Story = {
    args: {
        id: "focused-handle-24",
        position: 50,
        handleSize: HANDLE_SIZE.SIZE_24,
        tooltipValue: "50",
        isRight: false,
    },
    parameters: {
        pseudo: { focus: true },
    },
};

// Normal handle size 32
export const NormalSize32: Story = {
    args: {
        id: "normal-handle-32",
        position: 50,
        handleSize: HANDLE_SIZE.SIZE_32,
        tooltipValue: "50",
        isRight: false,
    },
};

// Hover handle size 32
export const HoverSize32: Story = {
    args: {
        id: "hover-handle-32",
        position: 50,
        handleSize: HANDLE_SIZE.SIZE_32,
        tooltipValue: "50",
        isRight: false,
    },
    parameters: {
        pseudo: { hover: true },
    },
};

// Focused handle size 32
export const FocusedSize32: Story = {
    args: {
        id: "focused-handle-32",
        position: 50,
        handleSize: HANDLE_SIZE.SIZE_32,
        tooltipValue: "50",
        isRight: false,
    },
    parameters: {
        pseudo: { focus: true },
    },
};
