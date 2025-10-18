// apps/web/src/pages/index.tsx
import { Button } from '@novakit/ui';
import LoginPage from './login';
import RegisterPage from './register';


export default function Page() {
    return (
        <div className="p-6">
        <RegisterPage />
        </div>
    );
}

