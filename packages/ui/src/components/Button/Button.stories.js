import { Button } from './Button';
const meta = {
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'danger'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        loading: { control: 'boolean' },
    },
};
export default meta;
export const Primary = {
    args: {
        children: 'Primary Button',
        variant: 'primary',
    },
};
export const Secondary = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary',
    },
};
export const Outline = {
    args: {
        children: 'Outline Button',
        variant: 'outline',
    },
};
export const Danger = {
    args: {
        children: 'Delete',
        variant: 'danger',
    },
};
export const Loading = {
    args: {
        children: 'Loading...',
        loading: true,
    },
};
