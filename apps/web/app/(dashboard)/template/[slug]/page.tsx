'use client';

import { getTemplateById } from '@repo/common/lib';
import { useChatStore } from '@repo/common/store';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { IconArrowLeft, IconCopy, IconMessage } from '@tabler/icons-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function TemplateSlugPage() {
    const params = useParams<{ slug: string }>();
    const template = getTemplateById(params.slug);
    const router = useRouter();
    const setEditor = useChatStore(state => state.setEditor);
    const editor = useChatStore(state => state.editor);

    if (!template) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold">Template Not Found</h1>
                <p className="text-muted-foreground">The template you are looking for does not exist.</p>
                <Link href="/templates">
                    <Button variant="outlined">Back to Library</Button>
                </Link>
            </div>
        );
    }

    const handleUseTemplate = () => {
        // We'll redirect to chat and would ideally pre-fill, but simpler to just copy for now
        // Or if we have access to editor state, might try to set it.
        // Since this is a separate route, we might need a query param or global store state.

        // Assuming global store persists:
        if (editor) {
            editor.commands.clearContent();
            editor.commands.insertContent(template.content);
        } else {
            // Fallback if editor not mounted yet (e.g. direct navigation)
            // Store in local storage to be picked up by chat input on mount
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('draft-message', template.content);
            }
        }

        router.push('/chat');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(template.content);
        toast.success("Template copied to clipboard");
    };

    return (
        <div className="flex h-full w-full justify-center overflow-y-auto p-4 md:p-8">
            <div className="w-full max-w-3xl space-y-6">
                <Link href="/templates" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <IconArrowLeft size={16} className="mr-2" />
                    Back to Library
                </Link>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{template.title}</h1>
                    <p className="text-xl text-muted-foreground">{template.description}</p>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">Template Content</CardTitle>
                        <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy to clipboard">
                            <IconCopy size={16} />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md bg-muted p-4 font-mono text-sm whitespace-pre-wrap">
                            {template.content}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Link href="/templates">
                        <Button variant="outlined">Cancel</Button>
                    </Link>
                    <Button onClick={handleUseTemplate} className="gap-2">
                        <IconMessage size={16} />
                        Use Template
                    </Button>
                </div>
            </div>
        </div>
    );
}
