import { Button } from '@repo/ui';
import { GradientText } from '../ui/gradient-text';
import Link from 'next/link';

export const CallToAction = () => {
    return (
        <section className="container mx-auto px-4 py-32">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-24 text-center backdrop-blur-sm md:px-12">
                {/* Background Glow */}
                <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[100px]" />

                <h2 className="mb-6 font-clash text-4xl font-bold tracking-tight md:text-5xl">
                    Ready to Start Your <br />
                    <GradientText>AI Journey?</GradientText>
                </h2>

                <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
                    Join thousands of researchers, creators, and developers building the future with PromptDex.
                </p>

                <Link href="/chat">
                    <Button size="lg" className="h-14 rounded-full px-12 text-lg">
                        Get Started Now
                    </Button>
                </Link>
            </div>
        </section>
    );
};
