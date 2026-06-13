import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("bg-card text-card-foreground border border-border rounded-xl", className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("p-6 pb-2 border-b border-border/50", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-base font-semibold tracking-tight text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
