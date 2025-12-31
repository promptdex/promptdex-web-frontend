'use client';

import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Separator } from '@repo/ui';
import { IconEdit, IconTrash, IconFileText, IconDatabase } from '@tabler/icons-react';
import { ViewHeader } from '@repo/common/components';

import { MOCK_DATASETS } from '@repo/common/lib';

export const DatasetView = ({ slug }: { slug: string }) => {
    // In a real app, fetch based on slug/id. For now, just use the first one or find by id if possible.
    const dataset = MOCK_DATASETS.find(d => d.id === slug) || MOCK_DATASETS[0];

    if (!dataset) return <div>Dataset not found</div>;

    return (
        <div>
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
                            <h1 className="text-4xl font-black tracking-tight">{dataset.name}</h1>
                            <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs uppercase">{dataset.type}</Badge>
                            </div>
                        </div>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-3xl ml-[3.75rem]">{dataset.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2 border-white/10 bg-white/[0.02] backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Items ({dataset.count})</CardTitle>
                            <Button size="sm" variant="default">Add Item</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted/50 rounded-lg p-2 border border-white/5">
                                {dataset.items?.map((item, index) => (
                                    <div key={index} className="px-3 py-2 border-b border-white/5 last:border-0 text-sm font-medium flex items-center gap-2">
                                        <div className="min-w-6 text-muted-foreground text-xs text-right opacity-50">{index + 1}</div>
                                        {item}
                                    </div>
                                ))}
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
                                <div className="text-sm font-medium text-muted-foreground">Type</div>
                                <div className="text-sm capitalize">{dataset.type}</div>
                            </div>
                            <Separator />
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                                <div className="text-sm">{dataset.updatedAt}</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
};
