import { SectionHeader } from '../ui/section-header';
import { FeatureCard } from '../ui/feature-card';
import { IconBolt, IconBrain, IconLock, IconWand } from '@tabler/icons-react';

const FEATURES = [
    {
        title: 'Instant Generation',
        description: 'Create high-quality content in seconds using the latest AI models optimized for speed and accuracy.',
        icon: <IconBolt size={24} />,
    },
    {
        title: 'Smart Context',
        description: 'Our AI understands your project context, ensuring relevant and consistent results every time.',
        icon: <IconBrain size={24} />,
    },
    {
        title: 'Secure & Private',
        description: 'Your data is encrypted and protected. We prioritize privacy and never train on your personal inputs.',
        icon: <IconLock size={24} />,
    },
    {
        title: 'Custom Workflows',
        description: 'Design tailored workflows that fit your specific needs, from coding assistants to creative writing aids.',
        icon: <IconWand size={24} />,
    },
];

export const Features = () => {
    return (
        <section id="features" className="container mx-auto px-4 py-24 md:py-32">
            <SectionHeader
                title="Supercharge {{Your Workflow}}"
                description="Everything you need to work smarter, not harder. Our features are designed to amplify your productivity."
                subtitle="Features"
                className="mb-16"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {FEATURES.map((feature, i) => (
                    <FeatureCard
                        key={i}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                    />
                ))}
            </div>
        </section>
    );
};
