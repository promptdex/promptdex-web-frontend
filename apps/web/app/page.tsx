import {
    Hero,
    Features,
    Pricing,
    Testimonials,
    CallToAction,
    LandingFooter as Footer,
    PageWrapper,
    RootLayout
} from '@repo/common/components';

/* 
 * Home Page (Landing)
 * Assembles the marketing organisms into a full page template.
 */
export default function Home() {
    return (
        <RootLayout>
            <PageWrapper className="w-full h-full overflow-y-auto">
                <Hero />
                <Features />
                <Pricing />
                <Testimonials />
                <CallToAction />
                <Footer />
            </PageWrapper>
        </RootLayout>
    );
}
