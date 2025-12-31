'use client';

import { RootLayout } from '@repo/common/components';
import { ReactQueryProvider, RootProvider } from '@repo/common/context';
import { AgentProvider } from '@repo/common/hooks';
import { TooltipProvider } from '@repo/ui';

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <RootProvider>
            <TooltipProvider>
                <ReactQueryProvider>
                    <AgentProvider>
                        <RootLayout>{children}</RootLayout>
                    </AgentProvider>
                </ReactQueryProvider>
            </TooltipProvider>
        </RootProvider>
    );
}
