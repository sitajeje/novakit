// packages/ui/scripts/create-component.ts
/*
    该脚本用于创建一个新的 React 组件，包含组件文件、Storybook 文件和索引文件。
    cd packages/ui
    pnpm ts-node scripts/create-component.ts Button
*/
/// <reference types="node" />
import fs from 'fs';
import path from 'path';
const componentName = process.argv[2];
if (!componentName) {
    console.error('请提供组件名称: pnpm run create-component Button');
    process.exit(1);
}
const dir = path.join(__dirname, `../src/components/${componentName}`);
fs.mkdirSync(dir, { recursive: true });
// Button.tsx
fs.writeFileSync(path.join(dir, `${componentName}.tsx`), `import React from 'react';

export interface ${componentName}Props {}

const ${componentName}: React.FC<${componentName}Props> = () => {
    return <div>${componentName} Component</div>;
};

export default ${componentName};
`);
// Button.stories.tsx
fs.writeFileSync(path.join(dir, `${componentName}.stories.tsx`), `import type { Meta, StoryObj } from '@storybook/react';
    import ${componentName} from './${componentName}';

    const meta: Meta<typeof ${componentName}> = {
    title: 'Components/${componentName}',
    component: ${componentName},
};
export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {};
`);
// index.ts
fs.writeFileSync(path.join(dir, 'index.ts'), `export { default } from './${componentName}';`);
console.log(`${componentName} 创建完成 🎉`);
