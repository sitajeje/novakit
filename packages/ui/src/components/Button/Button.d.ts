import React from 'react';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** 样式类型 */
    variant?: ButtonVariant;
    /** 尺寸 */
    size?: ButtonSize;
    /** 是否加载中 */
    loading?: boolean;
}
/**
 * 通用 Button 组件（支持多种变体与尺寸）
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map