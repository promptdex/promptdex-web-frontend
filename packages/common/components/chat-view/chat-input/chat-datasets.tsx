'use client';

import {
    Button,
} from '@repo/ui';
import { IconDatabase } from '@tabler/icons-react';
import { useState } from 'react';
import { DatasetDialog } from '../../shared-ui/dialogs';
import { useChatStore } from '@repo/common/store';

export const ChatDatasets = () => {
    const [isOpen, setIsOpen] = useState(false);
    const editor = useChatStore(state => state.editor);

    const handleSelect = (dataset: any) => {
        if (!editor) return;

        // Insert dataset variable
        editor.commands.insertContent({
            type: 'variable',
            attrs: {
                label: dataset.name,
                type: 'dataset',
                datasetId: dataset.id
            }
        });

        // Add a space after
        editor.commands.insertContent(' ');

        // Focus editor after insertion
        editor.commands.focus();
        setIsOpen(false);
    };

    return (
        <>
            <Button
                size="icon-sm"
                tooltip="Browse Datasets"
                variant="ghost"
                onClick={() => setIsOpen(true)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
                <IconDatabase size={18} strokeWidth={2} />
            </Button>
            <DatasetDialog open={isOpen} onOpenChange={setIsOpen} onSelect={handleSelect} />
        </>
    );
};
