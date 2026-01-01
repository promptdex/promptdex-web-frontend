import { Button } from '@repo/ui';
import { GradientText } from '../ui/gradient-text';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconArrowRight, IconSparkles } from '@tabler/icons-react';

export const Hero = () => {
    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 md:px-6 pt-32 pb-24 text-center">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 bg-brand/10 blur-3xl opacity-50 pointer-events-none rounded-full" />
                <div className="absolute right-0 top-1/2 h-[300px] w-[300px] bg-accent/20 blur-3xl opacity-50 pointer-events-none rounded-full" />
            </div>

            <div className="z-10 flex max-w-4xl flex-col items-center gap-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/50 px-4 py-1.5 text-sm backdrop-blur-md shadow-sm">
                    <IconSparkles size={16} className="text-brand" />
                    <span className="text-muted-foreground">The future of AI workflows is here</span>
                </div>

                <h1 className="font-clash text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
                    Build Faster with <br />
                    <GradientText>AI Superpowers</GradientText>
                </h1>

                <p className="max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
                    PromptDex empowers your creativity with advanced AI tools.
                    Generate content, automate workflows, and unlock new possibilities in seconds.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link href="/chat">
                        <Button size="lg" className="h-12 rounded-full px-8 text-lg hover:scale-105 transition-transform">
                            Get Started Free
                            <IconArrowRight size={20} className="ml-2" />
                        </Button>
                    </Link>
                    <Link href="#features">
                        <Button variant="outline" size="lg" className="h-12 rounded-full px-8 text-lg">
                            See Features
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Visual bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
};
