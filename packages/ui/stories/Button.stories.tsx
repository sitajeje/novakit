import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button' },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = { args: { variant: 'solid' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Large: Story = { args: { size: 'lg' } };
