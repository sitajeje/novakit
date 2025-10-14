import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
/**
 * 通用 Button 组件（支持多种变体与尺寸）
 */
export const Button = ({ children, variant = 'primary', size = 'md', loading = false, disabled, className, ...props }) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        outline: 'border border-gray-400 text-gray-700 hover:bg-gray-50',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-5 py-3 text-lg',
    };
    return (_jsxs("button", { ...props, disabled: disabled || loading, className: clsx(base, variants[variant], sizes[size], disabled && 'opacity-60 cursor-not-allowed', className), children: [loading && (_jsxs("svg", { className: "animate-spin -ml-1 mr-2 h-4 w-4 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" })] })), children] }));
};
export default Button;
