import { cn, Avatar } from '@repo/ui';

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    avatarUrl?: string;
    className?: string;
}

export const TestimonialCard = ({
    quote,
    author,
    role,
    avatarUrl,
    className,
}: TestimonialCardProps) => {
    return (
        <div
            className={cn(
                'flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-subtle-sm transition-all hover:shadow-subtle-md',
                className
            )}
        >
            <p className="text-lg leading-relaxed text-foreground/90 italic">"{quote}"</p>
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-white/10">
                    {avatarUrl && <img src={avatarUrl} alt={author} className="h-full w-full object-cover" />}
                </div>
                <div>
                    <div className="font-semibold text-foreground">{author}</div>
                    <div className="text-sm text-muted-foreground">{role}</div>
                </div>
            </div>
        </div>
    );
};
