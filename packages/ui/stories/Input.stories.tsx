// packages/ui/src/components/Input/Input.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Input from '../src/components/Input/Input';
import type { InputProps } from '../src/components/Input/Input'; 

const meta: Meta<InputProps> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input 用于接收用户输入，可配置 placeholder、value 和 onChange 事件。',
      },
    },
  },
};
export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

