import { cn } from '@repo/ui';

export const GradientText = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                'bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent',
                className
            )}
        >
            {children}
        </span>
    );
};
