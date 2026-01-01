import { Logo } from '../../shared-ui/graphics/logo';
import Link from 'next/link';

const LINKS = [
    {
        title: 'Product',
        items: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Testimonials', href: '#testimonials' },
            { label: 'Changelog', href: '#' },
        ],
    },
    {
        title: 'Resources',
        items: [
            { label: 'Documentation', href: '#' },
            { label: 'Community', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Support', href: '#' },
        ],
    },
    {
        title: 'Legal',
        items: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' },
        ],
    },
];

export const LandingFooter = () => {
    return (
        <footer className="border-t border-white/10 bg-black/20 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="mb-4 inline-flex items-center gap-2">
                            <Logo className="h-8 w-8 text-brand" />
                            <span className="font-clash text-xl font-bold">PromptDex</span>
                        </Link>
                        <p className="max-w-xs text-sm text-muted-foreground">
                            Empowering the next generation of AI research and productivity.
                            Built with ❤️ by Trendy Design.
                        </p>
                    </div>

                    {LINKS.map((group, i) => (
                        <div key={i}>
                            <h3 className="mb-4 font-semibold text-foreground">{group.title}</h3>
                            <ul className="space-y-2">
                                {group.items.map((link, j) => (
                                    <li key={j}>
                                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-brand transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} PromptDex. All rights reserved.</p>
                    <div className="flex gap-4">
                        {/* Social Icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};
