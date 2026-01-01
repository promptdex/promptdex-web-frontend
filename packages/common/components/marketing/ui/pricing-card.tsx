import { Button, cn } from '@repo/ui';
import { IconCheck } from '@tabler/icons-react';

interface PricingCardProps {
    tier: string;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
    className?: string;
}

export const PricingCard = ({
    tier,
    price,
    description,
    features,
    popular,
    buttonText = 'Get Started',
    onButtonClick,
    className,
}: PricingCardProps) => {
    return (
        <div
            className={cn(
                'relative flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 shadow-subtle-sm transition-all hover:border-brand/30 hover:shadow-elevation',
                popular && 'border-brand ring-1 ring-brand shadow-elevation',
                className
            )}
        >
            {popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                </div>
            )}
            <div className="flex flex-col gap-2">
                <h3 className="font-clash text-xl font-semibold text-foreground">{tier}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight text-foreground">{price}</span>
                    <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div className="flex flex-col gap-4 flex-1">
                {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                        <IconCheck size={18} className="text-brand shrink-0" />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>

            <Button
                variant={popular ? 'default' : 'outlined'}
                size="lg"
                className="w-full rounded-xl"
                onClick={onButtonClick}
            >
                {buttonText}
            </Button>
        </div>
    );
};
