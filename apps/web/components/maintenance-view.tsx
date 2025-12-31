'use client';

import { Button } from '@repo/ui';
import { IconAlertTriangle, IconRefresh, IconTool } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface MaintenanceViewProps {
    type?: 'error' | 'maintenance';
    error?: Error;
    reset?: () => void;
}

export const MaintenanceView = ({ type = 'maintenance', error, reset }: MaintenanceViewProps) => {
    const isError = type === 'error';

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex max-w-md flex-col items-center gap-6"
            >
                <div className="relative">
                    <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl animate-pulse" />
                    <div className="relative rounded-2xl bg-muted/50 p-4 ring-1 ring-border">
                        {isError ? (
                            <IconAlertTriangle className="size-12 text-destructive" stroke={1.5} />
                        ) : (
                            <IconTool className="size-12 text-primary" stroke={1.5} />
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isError ? 'Something went wrong' : 'System Maintenance'}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {isError
                            ? 'We encountered an unexpected error. Our team has been notified.'
                            : 'We are currently performing scheduled maintenance to improve your experience. Please check back soon.'}
                    </p>
                    {isError && error && (
                        <p className="rounded-lg bg-destructive/10 p-2 font-mono text-xs text-destructive">
                            {error.message || 'Unknown error occurred'}
                        </p>
                    )}
                </div>

                <div className="flex gap-4">
                    {isError && reset ? (
                        <Button onClick={() => reset()} size="lg" className="gap-2">
                            <IconRefresh size={18} />
                            Try Again
                        </Button>
                    ) : (
                        <Button onClick={() => window.location.reload()} size="lg" className="gap-2" variant="outlined">
                            <IconRefresh size={18} />
                            Check Status
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => window.open('mailto:support@promptdex.co', '_blank')}
                    >
                        Contact Support
                    </Button>
                </div>

                <div className="mt-8 flex gap-2 text-xs text-muted-foreground/50">
                    <span>PromptDex System</span>
                    <span>•</span>
                    <span>2025-{new Date().getFullYear()}</span>
                </div>
            </motion.div>
        </div>
    );
};
