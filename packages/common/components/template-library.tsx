'use client';

import { useChatStore } from '@repo/common/store';
import { Button, Card, CardContent, CardHeader, CardTitle, cn } from '@repo/ui';

import {
    IconArrowLeft,
    IconBriefcase,
    IconCode,
    IconMail,
    IconPalette,
    IconWriting,
    IconExternalLink,
} from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import { useState } from 'react';

import { Category, MOCK_CATEGORIES } from '../lib/mock-templates';

export const TemplateLibrary = () => {
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {selectedCategory.templates.map((template, index) => (
                        <Card
                            key={index}
                            className="group relative cursor-pointer border-muted bg-background/50 transition-all hover:bg-background hover:shadow-lg hover:border-primary/30"
                            onClick={() => handleTemplateClick(template.content)}
                        >
                            <CardHeader className="space-y-1 p-4 pb-2">
                                <CardTitle className="flex items-center justify-between text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
                                    <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/70 transition-all duration-300">
                                        {template.title}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.location.href = `/template/${template.id}`;
                                        }}
                                        className="rounded-full p-2 opacity-0 transition-all hover:bg-muted group-hover:opacity-100 flex items-center justify-center"
                                        title="View Details"
                                    >
                                        <IconExternalLink size={14} className="text-muted-foreground hover:text-foreground" />
                                    </button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-1">
                                <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed tracking-tight font-medium">
                                    {template.description}
                                </p>
                            </CardContent>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl space-y-6 p-4">
            <div className="text-center space-y-1">
                <h1 className="from-muted-foreground/50 via-muted-foreground/40 to-muted-foreground/20 bg-gradient-to-r bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
                    PromptDex Library
                </h1>
                <p className="text-muted-foreground/60 text-sm font-medium tracking-tight">
                    Choose a category to find the perfect template for your needs
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {MOCK_CATEGORIES.map(category => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category)}
                        className="flex flex-col items-center justify-center gap-3 rounded-xl border border-muted bg-background/40 p-6 transition-all hover:bg-background hover:shadow-md hover:scale-105 hover:border-primary/20"
                    >
                        <div className={cn("rounded-full p-3 bg-muted/50 transition-colors", category.color)}>
                            <category.icon size={28} />
                        </div>
                        <span className="text-sm font-medium">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
