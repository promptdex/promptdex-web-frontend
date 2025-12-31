'use client';

import { RootLayout } from '@repo/common/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <RootLayout>{children}</RootLayout>;
}
