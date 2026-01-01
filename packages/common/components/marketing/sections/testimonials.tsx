import { SectionHeader } from '../ui/section-header';
import { TestimonialCard } from '../ui/testimonial-card';

const TESTIMONIALS = [
    {
        quote: "PromptDex has completely transformed how I research. The AI agents are incredibly smart and adaptable.",
        author: "Sarah Chen",
        role: "Product Manager",
    },
    {
        quote: "The template library is a lifesaver. I can get tailored outputs in seconds instead of hours.",
        author: "Marcus Rodriguez",
        role: "Content Creator",
    },
    {
        quote: "I use the coding templates daily. It's like having a senior engineer pair programming with me.",
        author: "David Kim",
        role: "Software Engineer",
    },
    {
        quote: "The interface is beautiful and intuitive. It makes working with complex AI models feel simple.",
        author: "Emily Watson",
        role: "UX Designer",
    },
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="container mx-auto px-4 py-24 overflow-hidden">
            <SectionHeader
                title="Loved by {{Innovators}}"
                subtitle="Testimonials"
                description="See what our community has to say about PromptDex."
                className="mb-16"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {TESTIMONIALS.map((t, i) => (
                    <TestimonialCard key={i} {...t} />
                ))}
            </div>
        </section>
    );
};
