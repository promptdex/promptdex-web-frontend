'use client';

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    cn,
    Input,
    Label,
    Textarea,
    Badge
} from '@repo/ui';
import {
    IconDeviceFloppy,
    IconEye,
    IconInfoCircle,
    IconPencil,
    IconSparkles,
    IconVariable
} from '@tabler/icons-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DesignerPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const handleSave = () => {
        // Here you would implement the save logic
        console.log({ title, description, content, category });
        alert('Template saved (mock)!');
    };

    // Extract variables from content
    const variables = content.match(/\[(.*?)\]/g) || [];
    const uniqueVariables = Array.from(new Set(variables));

    return (
        <div className="flex h-full w-full flex-col overflow-y-auto bg-muted/10 p-4 md:p-8">
            <div className="mx-auto w-full max-w-6xl space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <IconPencil size={24} />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight">Template Designer</h1>
                        </div>
                        <p className="text-muted-foreground ml-12">Craft powerful prompt templates for your workflow</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => setIsPreviewMode(!isPreviewMode)}
                            className="gap-2"
                        >
                            <IconEye size={18} />
                            {isPreviewMode ? 'Edit Mode' : 'Preview'}
                        </Button>
                        <Button onClick={handleSave} className="gap-2 shadow-lg shadow-primary/20">
                            <IconDeviceFloppy size={18} />
                            Save Template
                        </Button>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Meta Information */}
                    <div className="space-y-6 lg:col-span-1">
                        <Card className="border-muted bg-background/50 shadow-sm backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <IconInfoCircle size={18} className="text-muted-foreground" />
                                    Template Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs uppercase tracking-wider text-muted-foreground">Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., SEO Blog Post Generator"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="bg-background"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-xs uppercase tracking-wider text-muted-foreground">Category</Label>
                                    <Input
                                        id="category"
                                        placeholder="e.g., Marketing"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="bg-background"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-xs uppercase tracking-wider text-muted-foreground">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe the purpose of this template..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="min-h-[120px] bg-background resize-none"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Variables Detected Card */}
                        <Card className="border-muted bg-background/50 shadow-sm backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <IconVariable size={18} className="text-muted-foreground" />
                                    Detected Variables
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {uniqueVariables.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueVariables.map((v, i) => (
                                            <Badge key={i} variant="secondary" className="px-2 py-1 text-xs">
                                                {v}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">
                                        Use [brackets] in your prompt to create variables.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Editor */}
                    <div className="lg:col-span-2 h-full">
                        <Card className="flex h-full flex-col border-muted bg-background shadow-sm">
                            <CardHeader className="border-b bg-muted/10 pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <IconSparkles size={18} className="text-primary" />
                                        Prompt Editor
                                    </CardTitle>
                                    <Badge variant="outline" className="font-mono text-xs">
                                        {content.length} chars
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-0">
                                {isPreviewMode ? (
                                    <div className="h-full min-h-[500px] p-6 text-sm leading-relaxed whitespace-pre-wrap">
                                        {content || <span className="text-muted-foreground italic">No content to preview...</span>}
                                    </div>
                                ) : (
                                    <Textarea
                                        id="content"
                                        className="h-full min-h-[500px] w-full resize-none rounded-none border-0 p-6 font-mono text-sm leading-relaxed focus-visible:ring-0"
                                        placeholder="Write your prompt template here. Use [Square Brackets] to define variables that users will fill in before sending."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
