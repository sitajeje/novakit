// packages/ui/src/components/Card/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';


const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      layout: 'centered',
      description: {
        component: 'Card 用于内容分组展示，支持自定义标题、内容和底部操作。',
      },
      argTypes: {
        actions: { control: 'object' },
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    content: 'This is the card content.',
    actions: [
      { label: 'Edit', onClick: console.log.bind(console, 'Edit clicked') },
      { label: 'Delete', onClick: console.log.bind(console, 'Delete clicked') },
    ],
  },
};


