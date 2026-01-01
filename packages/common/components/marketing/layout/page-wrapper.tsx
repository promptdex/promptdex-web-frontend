import { cn } from '@repo/ui';

export const PageWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn('flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden', className)}>
            {children}
        </div>
    );
};
