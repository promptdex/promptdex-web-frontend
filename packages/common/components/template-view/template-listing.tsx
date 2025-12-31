'use client';

import { useChatStore } from '@repo/common/store';
import { Button, Card, CardContent, CardHeader, CardTitle, cn } from '@repo/ui';

import {
    IconArrowLeft,
} from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import { useState } from 'react';

import { Category, MOCK_CATEGORIES } from '@repo/common/lib';
import { DirectoryCard, DirectoryGrid, DirectorySearch } from '@repo/common/components';
import Link from 'next/link';

export const TemplateListing = () => {
    const editor: Editor | undefined = useChatStore(state => state.editor);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleTemplateClick = (content: string) => {
        if (!editor) return;

        // Manually parse the content into nodes to ensure variables are created
        const nodes = [];
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
    };

    // if (!editor) return null;

    if (selectedCategory) {
        return (
            <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-4 flex items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                        className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <IconArrowLeft size={16} />
                        Back to Categories
                    </Button>
                </div>
                <div className="mb-6 flex items-center gap-3">
                    <div className={cn("rounded-lg p-2 bg-muted/50", selectedCategory.color)}>
                        <selectedCategory.icon size={24} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">{selectedCategory.name} Templates</h2>
                </div>
                <DirectoryGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {selectedCategory.templates.map((template, index) => (
                        <DirectoryCard
                            key={index}
                            title={template.title}
                            description={template.description}
                            href={`/template/${template.id}`}
                        />
                    ))}
                </DirectoryGrid>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl space-y-6 p-4">
            <div className="text-center space-y-4 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent">
                    PromptDex Library
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    Choose a category to find the perfect template for your needs
                </p>
                <DirectorySearch value={""} onChange={() => { }} placeholder="Search templates..." />
            </div>

            <DirectoryGrid className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {MOCK_CATEGORIES.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category)}
                        className="flex flex-col items-center justify-center gap-4 p-8 rounded-[32px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] hover:border-primary/20 cursor-pointer group"
                    >
                        <div className={cn("rounded-full p-4 bg-muted/50 transition-all group-hover:scale-110 group-hover:shadow-lg", category.color)}>
                            <category.icon size={32} />
                        </div>
                        <span className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{category.name}</span>
                    </button>
                ))}
            </DirectoryGrid>
        </div>
    );
};
