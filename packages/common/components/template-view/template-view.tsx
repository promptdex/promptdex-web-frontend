'use client';

import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Separator } from '@repo/ui';
import { IconArrowLeft, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Placeholder for now, replace with actual data fetching
const MOCK_TEMPLATE = {
    id: '1',
    title: 'Professional Email',
    description: 'A template for writing professional emails.',
    content: 'Dear [Name], \n\n I am writing to you regarding...',
    category: 'Business',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-02',
};

export const TemplateView = ({ id }: { id: string }) => {
    const router = useRouter();
    // Fetch template data using id

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <IconArrowLeft size={18} />
                    Back to Library
                </Button>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" className="gap-2">
                        <IconEdit size={16} />
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="gap-2">
                        <IconTrash size={16} />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-4xl font-black tracking-tight">{MOCK_TEMPLATE.title}</h1>
                        <Badge variant="secondary" className="text-sm">{MOCK_TEMPLATE.category}</Badge>
                    </div>
                    <p className="text-xl text-muted-foreground">{MOCK_TEMPLATE.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 border-white/10 bg-white/[0.02] backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Template Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 rounded-md bg-muted/30 font-mono text-sm whitespace-pre-wrap">
                                {MOCK_TEMPLATE.content}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="h-fit border-white/10 bg-white/[0.02] backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">ID</div>
                                <div className="text-sm font-mono">{id}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Created</div>
                                <div className="text-sm">{MOCK_TEMPLATE.createdAt}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                                <div className="text-sm">{MOCK_TEMPLATE.updatedAt}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
