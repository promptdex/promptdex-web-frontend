'use client';

import {
    Button,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    cn
} from '@repo/ui';
import { IconTemplate, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { TemplateListing } from '../../template-view';
import { useChatStore } from '@repo/common/store';

export const ChatTemplates = () => {
    const [isOpen, setIsOpen] = useState(false);
    const editor = useChatStore(state => state.editor);

    const handleSelect = (template: any) => {
        if (!editor) return;

        // Manually parse the content into nodes to ensure variables are created
        const nodes = [];
        const content = template.content || '';
        const regex = /\[(.*?)\]/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(content)) !== null) {
            // Add text before the variable
            if (match.index > lastIndex) {
                nodes.push({
                    type: 'text',
                    text: content.substring(lastIndex, match.index),
                });
            }
            // Add the variable node
            const [label, type, optionsStr] = match[1].split(':');
            nodes.push({
                type: 'variable',
                attrs: {
                    label,
                    type: type || 'text',
                    options: optionsStr ? optionsStr.split(',') : []
                },
            });
            lastIndex = regex.lastIndex;
        }
        // Add remaining text
        if (lastIndex < content.length) {
            nodes.push({
                type: 'text',
                text: content.substring(lastIndex),
            });
        }

        editor.commands.clearContent();

        // We wrap it in a paragraph if it's inline content
        editor.commands.setContent({
            type: 'doc',
            content: [
                {
                    type: 'paragraph',
                    content: nodes.length > 0 ? nodes : [{ type: 'text', text: content }],
                },
            ],
        });

        // Focus editor after insertion
        editor.commands.focus();
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="icon-sm"
                    tooltip="Browse Templates"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                    <IconTemplate size={18} strokeWidth={2} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0 overflow-hidden border-none bg-transparent shadow-none">
                <div className="flex-1 overflow-y-auto no-scrollbar rounded-3xl bg-background/80 backdrop-blur-3xl border border-white/10 p-6 shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold">Template Library</DialogTitle>
                        <DialogDescription>
                            Select a template to insert into your chat.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1">
                        <TemplateListing onSelect={handleSelect} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
