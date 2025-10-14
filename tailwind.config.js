/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './apps/web/**/*.{js,ts,jsx,tsx}',
        './apps/web/app/**/*.{js,ts,jsx,tsx}',
        './packages/ui/src/**/*.{ts,tsx}'  // monorepo 公共组件
    ],
    theme: { extend: {} },
    plugins: []
};
