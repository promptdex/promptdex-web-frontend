import { cn } from '@repo/ui';
import { GradientText } from './gradient-text';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

export const SectionHeader = ({
    title,
    subtitle,
    description,
    align = 'center',
    className,
}: SectionHeaderProps) => {
    return (
        <div
            className={cn(
                'flex flex-col gap-4',
                align === 'center' && 'items-center text-center',
                align === 'right' && 'items-end text-right',
                className
            )}
        >
            {subtitle && (
                <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-brand/50" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-brand">
                        {subtitle}
                    </span>
                    <span className="h-px w-8 bg-brand/50" />
                </div>
            )}
            <h2 className="font-clash text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {title.split(' ').map((word, i) =>
                    word.startsWith('{{') && word.endsWith('}}') ? (
                        <GradientText key={i} className="px-2">
                            {word.replace(/{{|}}/g, '') + ' '}
                        </GradientText>
                    ) : (
                        word + ' '
                    )
                )}
            </h2>
            {description && (
                <p className="max-w-2xl text-lg text-muted-foreground">{description}</p>
            )}
        </div>
    );
};
