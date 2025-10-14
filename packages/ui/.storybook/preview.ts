import '../src/styles/tailwind.css';
import { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        layout: 'centered',
        docs: {
        },
        controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        },
    },
};

export default preview;

