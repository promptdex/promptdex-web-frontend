'use client';

import { Button, Input, Label, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@repo/ui';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const TemplateCreate = () => {
    const router = useRouter();

    return (
        <div className="w-full max-w-3xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="text-muted-foreground hover:text-foreground"
                >
                    <IconArrowLeft size={20} />
                </Button>
                <h1 className="text-3xl font-black tracking-tight">Create New Template</h1>
            </div>

            <div className="space-y-6 p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="space-y-2">
                    <Label htmlFor="title">Template Title</Label>
                    <Input id="title" placeholder="e.g., Monthly Report Generator" className="bg-black/20 border-white/10" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                        <SelectTrigger className="bg-black/20 border-white/10">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="coding">Coding</SelectItem>
                            <SelectItem value="writing">Creative Writing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea id="description" placeholder="Briefly describe what this template does..." className="bg-black/20 border-white/10 min-h-[80px]" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Prompt Content</Label>
                    <Textarea
                        id="content"
                        placeholder="Write your prompt template here. Use [variable] syntax for dynamic fields."
                        className="bg-black/20 border-white/10 min-h-[300px] font-mono text-sm leading-relaxed"
                    />
                    <p className="text-xs text-muted-foreground">Tip: Use [Topic] or [Key Points] to create variables that you can fill in later.</p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button>Create Template</Button>
                </div>
            </div>
        </div>
    );
};
