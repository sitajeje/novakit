import * as React from "react";
import { cn } from "../../lib/cn";

/**
 * Card 容器组件
 * 提供现代化阴影、圆角、过渡效果
 */
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // 基础结构
      "relative rounded-2xl border border-border bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-md shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)] dark:from-zinc-900/50 dark:to-zinc-800/40 dark:border-zinc-700/60",
      // 动效
      "transition-all duration-300 hover:shadow-[0_6px_24px_-6px_rgba(0,0,0,0.15)] hover:scale-[1.01]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * 卡片头部区域，通常包含标题或图标
 */
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 border-b border-border/50 dark:border-zinc-700/40", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * 卡片内容区域
 */
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 text-foreground/90", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * 卡片底部区域，可放置按钮或信息
 */
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-4 border-t border-border/50 dark:border-zinc-700/40 flex items-center justify-end",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/**
 * 标题
 */
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold tracking-tight text-foreground", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * 副标题或描述
 */
export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground mt-1 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";
