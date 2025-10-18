// packages/ui/src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import type { ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // ✅ 启用 Auto Docs Props 表格
  parameters: {
    docs: {
      description: {
        component: 'Button 用于触发操作，例如提交表单或触发事件。可通过 variant 改变样式。',
      },
    },
  },
};
export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};


