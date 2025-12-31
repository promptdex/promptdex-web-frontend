'use client';

import { Button } from '@repo/ui';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface ViewHeaderProps {
    backLabel?: string;
    onBack?: () => void;
    children?: ReactNode;
}

export const ViewHeader = ({ backLabel = "Back", onBack, children }: ViewHeaderProps) => {
    const router = useRouter();
    const handleBack = onBack || (() => router.back());

    return (
        <div className="flex items-center justify-between">
            <Button
                variant="ghost"
                onClick={handleBack}
                className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <IconArrowLeft size={18} />
                {backLabel}
            </Button>
            <div className="flex gap-2">
                {children}
            </div>
        </div>
    );
};
