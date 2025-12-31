'use client';

import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Separator } from '@repo/ui';
import { IconEdit, IconTrash, IconFileText, IconDatabase } from '@tabler/icons-react';
import { ViewHeader } from '../shared-ui/view-header';

// Placeholder mock data
const MOCK_DATASET = {
    slug: 'legal-docs-2024',
    title: 'Legal Documents 2024',
    description: 'Comprehensive collection of Brazilian civil law documents and precedents.',
    documentCount: 1240,
    size: '4.2 GB',
    createdAt: '2024-03-15',
    lastIndexed: '2024-03-20',
    tags: ['Legal', 'Brazil', 'Civil Law'],
};

export const DatasetView = ({ slug }: { slug: string }) => {

    return (
        <div className="w-full max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ViewHeader backLabel="Back to Library">
                <Button variant="outlined" size="sm" className="gap-2">
                    <IconEdit size={16} />
                    Edit Dataset
                </Button>
                <Button variant="destructive" size="sm" className="gap-2">
                    <IconTrash size={16} />
                    Delete
                </Button>
            </ViewHeader>

            <div className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <IconDatabase className="size-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight">{MOCK_DATASET.title}</h1>
                            <div className="flex gap-2 mt-1">
                                {MOCK_DATASET.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl ml-[3.75rem]">{MOCK_DATASET.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 border-white/10 bg-white/[0.02] backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Documents</CardTitle>
                            <Button size="sm" variant="default">Add Documents</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-3 min-h-[300px] items-center justify-center text-muted-foreground p-8 border-2 border-dashed border-white/5 rounded-lg bg-black/20">
                                <IconFileText className="size-12 opacity-50" />
                                <p>Document list will appear here</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="h-fit border-white/10 bg-white/[0.02] backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Dataset Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Slug</div>
                                <div className="text-sm font-mono">{slug}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Total Documents</div>
                                <div className="text-sm font-semibold">{MOCK_DATASET.documentCount.toLocaleString()}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Total Size</div>
                                <div className="text-sm">{MOCK_DATASET.size}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Created</div>
                                <div className="text-sm">{MOCK_DATASET.createdAt}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Last Indexed</div>
                                <div className="text-sm">{MOCK_DATASET.lastIndexed}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
