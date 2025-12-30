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
} from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import { useState } from 'react';

import { Category, MOCK_CATEGORIES } from '../lib/mock-templates';

export const TemplateLibrary = () => {
    const editor: Editor | undefined = useChatStore(state => state.editor);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleTemplateClick = (content: string) => {
        if (!editor) return;
        editor.commands.clearContent();
        editor.commands.insertContent(content);
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
                            className="group cursor-pointer border-muted bg-background/50 transition-all hover:bg-background hover:shadow-md hover:border-primary/20"
                            onClick={() => window.location.href = `/template/${template.id}`}
                        >
                            <CardHeader className="space-y-1 p-4">
                                <CardTitle className="text-base font-medium group-hover:text-primary">
                                    {template.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {template.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl space-y-6 p-4">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    PromptDex Library
                </h1>
                <p className="text-muted-foreground">
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
