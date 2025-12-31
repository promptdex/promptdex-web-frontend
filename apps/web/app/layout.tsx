import { cn } from '@repo/ui';
import { GeistMono } from 'geist/font/mono';
import type { Viewport } from 'next';
import { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import localFont from 'next/font/local';
import { ClientProviders } from './client-providers';
import Script from 'next/script';

const bricolage = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-bricolage',
});

import './globals.css';

// Force dynamic rendering to prevent useContext errors during static generation
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'PromptDex - Go Deeper with AI-Powered Research & Agentic Workflows',
    description:
        'Experience deep, AI-powered research with agentic workflows and a wide variety of models for advanced productivity.',
    keywords: 'AI chat, LLM, language models, privacy, minimal UI, ollama, chatgpt',
    authors: [{ name: 'Trendy design', url: 'https://trendy.design' }],
    creator: 'Trendy design',
    publisher: 'Trendy design',
    metadataBase: new URL('https://promptdex.co'),
    openGraph: {
        title: 'PromptDex - Go Deeper with AI-Powered Research & Agentic Workflows',
        siteName: 'PromptDex',
        description:
            'Experience deep, AI-powered research with agentic workflows and a wide variety of models for advanced productivity.',
        url: 'https://promptdex.co',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://promptdex.co/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'PromptDex Preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PromptDex - Go Deeper with AI-Powered Research & Agentic Workflows',
        site: 'PromptDex',
        creator: '@promptdex',
        description:
            'Experience deep, AI-powered research with agentic workflows and a wide variety of models for advanced productivity.',
        images: ['https://promptdex.co/twitter-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://promptdex.co',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

const inter = localFont({
    src: './InterVariable.woff2',
    variable: '--font-inter',
});

const clash = localFont({
    src: './ClashGrotesk-Variable.woff2',
    variable: '--font-clash',
});

export default function ParentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(GeistMono.variable, inter.variable, clash.variable, bricolage.variable)}
            suppressHydrationWarning
        >
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                {process.env.NODE_ENV === 'development' && (
                    <Script
                        id="react-grab"
                        src="https://unpkg.com/react-grab/dist/index.global.js"
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                    />
                )}
            </head>
            <body>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
