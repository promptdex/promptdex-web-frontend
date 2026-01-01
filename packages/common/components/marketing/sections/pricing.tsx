import { SectionHeader } from '../ui/section-header';
import { PricingCard } from '../ui/pricing-card';

const TIERS = [
    {
        tier: 'Free',
        price: '$0',
        description: 'Perfect for exploring and small projects.',
        features: [
            'Access to 3 basic templates',
            '5 chats per day',
            'Standard support',
            'Community access',
        ],
        popular: false,
    },
    {
        tier: 'Pro',
        price: '$29',
        description: 'For power users and professionals.',
        features: [
            'Access to all templates',
            'Unlimited chats',
            'Priority support',
            'Private projects',
            'Advanced AI models',
        ],
        popular: true,
        buttonText: 'Start Pro Trial',
    },
    {
        tier: 'Team',
        price: '$99',
        description: 'Collaborate with your entire team.',
        features: [
            'Everything in Pro',
            '5 team members',
            'Shared workspace',
            'Admin dashboard',
            'SSO Integration',
        ],
        popular: false,
        buttonText: 'Contact Sales',
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="container mx-auto px-4 py-24">
            <SectionHeader
                title="Simple, Transparent {{Pricing}}"
                subtitle="Pricing"
                description="Choose the plan that fits your needs. No hidden fees, cancel anytime."
                className="mb-16"
            />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {TIERS.map((tier, i) => (
                    <PricingCard
                        key={i}
                        {...tier}
                    />
                ))}
            </div>
        </section>
    );
};
