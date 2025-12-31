import { useChatStore } from '@repo/common/store';
import { cn, Flex } from '@repo/ui';
import { Editor, EditorContent } from '@tiptap/react';
import { FC, useEffect, useState } from 'react';
import { IconLock, IconLockOpen, IconPencil } from '@tabler/icons-react';
import { Button } from '@repo/ui';

export type TChatEditor = {
    sendMessage?: (message: string) => void;
    editor: Editor | null;
    maxHeight?: string;
    className?: string;
    placeholder?: string;
    isTemplateMode?: boolean;
};

export const ChatEditor: FC<TChatEditor> = ({
    sendMessage,
    editor,
    placeholder,
    maxHeight = '200px',
    className,
    isTemplateMode = false,
}) => {
    const isGenerating = useChatStore(state => state.isGenerating);

    if (!editor) return null;

    const editorContainerClass =
        'no-scrollbar [&>*]:no-scrollbar wysiwyg min-h-[60px] w-full cursor-text overflow-y-auto px-4 py-2 text-lg outline-none focus:outline-none [&>*]:leading-8 [&>*]:outline-none [&>*]:break-all [&>*]:word-break-break-word [&>*]:whitespace-pre-wrap';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isGenerating) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            sendMessage?.(editor.getText());
        }
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
        }
    };

    return (
        <Flex className="flex-1 relative group">
            <EditorContent
                editor={editor}
                autoFocus
                style={{
                    maxHeight,
                }}
                disabled={isGenerating}
                onKeyDown={handleKeyDown}
                className={cn(editorContainerClass, className, isTemplateMode && " [&>.tiptap]:cursor-default")}
            />
        </Flex>
    );
};
