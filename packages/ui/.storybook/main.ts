// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        '@storybook/addon-themes',
    ],
    framework: { name: '@storybook/react-vite', options: {} },
    typescript: { check: true, reactDocgen: 'react-docgen-typescript' },
    docs: { autodocs: 'tag' },
};

export default config;




