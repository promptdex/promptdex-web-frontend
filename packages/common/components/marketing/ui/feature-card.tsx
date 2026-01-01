import { cn } from '@repo/ui';

interface FeatureCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    className?: string;
    delay?: number;
}

export const FeatureCard = ({
    title,
    description,
    icon,
    className,
}: FeatureCardProps) => {
    return (
        <div
            className={cn(
                'group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-subtle-sm transition-all hover:border-brand/50 hover:shadow-subtle-md',
                className
            )}
        >
            <div className="absolute -right-4 -top-4 -z-10 h-32 w-32 rounded-full bg-brand/10 blur-3xl transition-all group-hover:bg-brand/20" />

            {icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-brand ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            )}

            <div className="flex flex-col gap-2">
                <h3 className="font-clash text-xl font-semibold text-foreground">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
        </div>
    );
};
