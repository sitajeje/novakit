// packages/ui/scripts/create-component.ts
/*
    该脚本用于创建一个新的 React 组件，包含组件文件、Storybook 文件和索引文件。
    cd packages/ui
    pnpm ts-node scripts/create-component.ts Button
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 兼容 ESM 模式
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];
if (!componentName) {
  console.error('❌ Please provide a component name.');
  process.exit(1);
}

const componentsDir = path.resolve(__dirname, '../src/components');
const componentDir = path.join(componentsDir, componentName);

// 确保 src/components 目录存在
fs.mkdirSync(componentDir, { recursive: true });

// === 组件模板 ===
const componentCode = `import React from 'react';
import clsx from 'clsx';

export interface ${componentName}Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({ title, children, className, ...props }) => {
  return (
    <div {...props} className={clsx('rounded-lg p-4 bg-white shadow', className)}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
};

export default ${componentName};
`;

// === Storybook 模板 ===
const storyCode = `import type { Meta, StoryObj } from '@storybook/react';
import ${componentName} from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    title: '${componentName} example',
    children: 'Hello ${componentName}!',
  },
};
`;

// 写入文件
fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentCode);
fs.writeFileSync(path.join(componentDir, `${componentName}.stories.tsx`), storyCode);
fs.writeFileSync(path.join(componentDir, `index.ts`), `export { default } from './${componentName}';\n`);

console.log(`✅ Created component: ${componentName} in ${componentDir}`);
