import type { Meta, StoryObj } from "@storybook/react";

import { SectionHeading } from "./SectionHeading";

const meta: Meta<typeof SectionHeading> = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
  args: {
    eyebrow: "Guest Connect",
    title: "Découvrez des expériences uniques",
    description:
      "Réservez des hébergements, voitures et expériences premium partout dans le monde.",
    align: "left",
  },
  argTypes: {
    align: {
      control: "radio",
      options: ["left", "center"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SectionHeading>;

export const Default: Story = {};

export const Centered: Story = {
  args: {
    align: "center",
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};

export const WithoutEyebrow: Story = {
  args: {
    eyebrow: undefined,
  },
};