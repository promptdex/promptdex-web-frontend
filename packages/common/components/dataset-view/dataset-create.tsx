'use client';

import { Button, Input, Label, Textarea } from '@repo/ui';
import { IconArrowLeft, IconCloudUpload } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export const DatasetCreate = () => {
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
                <h1 className="text-3xl font-black tracking-tight">New Dataset</h1>
            </div>

            <div className="space-y-6 p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <div className="space-y-2">
                    <Label htmlFor="title">Dataset Name</Label>
                    <Input id="title" placeholder="e.g., Q3 Financial Reports" className="bg-black/20 border-white/10" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL Friendly)</Label>
                    <Input id="slug" placeholder="e.g., q3-financial-reports" className="bg-black/20 border-white/10 font-mono text-sm" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="What kind of documents does this dataset contain?" className="bg-black/20 border-white/10 min-h-[100px]" />
                </div>

                <div className="space-y-4 pt-4">
                    <Label>Initial Documents</Label>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-white/5 transition-all cursor-pointer group">
                        <div className="p-4 bg-black/20 rounded-full group-hover:scale-110 transition-transform">
                            <IconCloudUpload className="size-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold text-foreground">Click to upload or drag and drop</p>
                            <p className="text-sm text-muted-foreground">PDF, TXT, MD, DOCX (max 20MB)</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
                    <Button variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button>Create Dataset</Button>
                </div>
            </div>
        </div>
    );
};
