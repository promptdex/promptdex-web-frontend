'use client';

import { useChatStore } from '@repo/common/store';
import { MOCK_CATEGORIES, Template, Category, getGreeting, insertTemplateIntoEditor } from '@repo/common/lib';
import { cn } from '@repo/ui';
import { IconSparkles } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TemplateCard } from './template-card';
import { CategoryButton } from './category-button';

export const ChatLanding = () => {
    const editor = useChatStore(state => state.editor);
    const setActiveTemplate = useChatStore(state => state.setActiveTemplate);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleTemplateClick = (template: Template) => {
        if (!editor) return;
        setActiveTemplate(template);
        insertTemplateIntoEditor(editor, template);
    };

    // Get featured templates (first 6 from all categories)
    const featuredTemplates = MOCK_CATEGORIES.flatMap(cat =>
        cat.templates.slice(0, 2).map(t => ({ ...t, category: cat }))
    ).slice(0, 6);

    return (
        <div className="flex h-full w-full flex-col items-center overflow-y-auto overflow-x-hidden p-4">
            <div className="flex min-h-full w-full max-w-4xl flex-col items-center justify-center pb-32 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full space-y-8"
                >
                    {/* Hero Section */}
                    <div className="text-center space-y-4 pt-12">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                        >
                            <IconSparkles size={16} />
                            <span>Powered by AI</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            {getGreeting()}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-md mx-auto">
                            Start a conversation or pick a template below
                        </p>
                    </div>

                    {/* Featured Templates */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Quick Start</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {featuredTemplates.map((template, i) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    onClick={() => handleTemplateClick(template)}
                                    index={i}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Category Grid */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Browse Categories</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {MOCK_CATEGORIES.map((category, i) => (
                                <CategoryButton
                                    key={category.id}
                                    category={category}
                                    onClick={() => setSelectedCategory(category)}
                                    index={i}
                                />
                            ))}
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};
