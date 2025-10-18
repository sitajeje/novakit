import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import type { SelectProps } from './Select';

const meta: Meta<SelectProps> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    options: [],
  },
};
