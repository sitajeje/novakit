// apps/web/src/pages/index.tsx
import { Button } from '@novakit/ui';


export default function Page() {
    return (
        <div className="p-6">
        <Button variant="primary" size="md">
            提交
        </Button>
        <Button variant="secondary" size="sm" className="ml-2">
            取消
        </Button>
        </div>
    );
}

