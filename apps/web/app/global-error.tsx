'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { MaintenanceView } from '@/components/maintenance-view';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        if (process.env.NODE_ENV === 'production') {
            Sentry.captureException(error);
        }
    }, [error]);

    return (
        <html>
            <body>
                <MaintenanceView type="error" error={error} reset={reset} />
            </body>
        </html>
    );
}
