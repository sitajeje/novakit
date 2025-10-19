import "../src/styles/index.css";
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
        a11y: { element: '#root' },
    },
};

export default preview;

