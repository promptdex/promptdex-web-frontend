import { withSentryConfig } from '@sentry/nextjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    // Note: 'standalone' is removed for Cloudflare Workers deployment
    transpilePackages: ['next-mdx-remote'],
    images: {
        // Use unoptimized for Cloudflare Workers (or configure Cloudflare Images later)
        unoptimized: true,
        remotePatterns: [
            { hostname: 'www.google.com' },
            { hostname: 'zyqdiwxgffuy8ymd.public.blob.vercel-storage.com' },
        ],
    },

    experimental: {
        externalDir: true,
    },
    webpack: (config, options) => {
        if (!options.isServer) {
            config.resolve.fallback = { fs: false, module: false, path: false };
        }

        // Experimental features
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
            layers: true,
        };

        return config;
    },
};

export default withSentryConfig(nextConfig, {
    // Sentry configuration (unchanged)
    org: 'saascollect',
    project: 'javascript-nextjs',
    silent: !process.env.CI,
    widenClientFileUpload: true,
    hideSourceMaps: true,
    // disableLogger: true, // Removed in favor of webpack.treeshake.removeDebugLogging (set automatically by Sentry wizard or manually if needed, but defaults are usually fine)
    // automaticVercelMonitors: true, // Removed
});
