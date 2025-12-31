import { ChatEditor } from '../chat-input';
import { markdownStyles } from './markdown-content';
import { useAgentStream, useChatEditor, useCopyText } from '@repo/common/hooks';
import { useChatStore } from '@repo/common/store';
import { ThreadItem } from '@repo/shared/types';
import { Button, cn } from '@repo/ui';
import { IconCheck, IconCopy, IconPencil } from '@tabler/icons-react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { ImageMessage } from './image-message';
type MessageProps = {
    message: string;
    imageAttachment?: string;
    threadItem: ThreadItem;
};

export const Message = memo(({ message, imageAttachment, threadItem }: MessageProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const messageRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showExpandButton, setShowExpandButton] = useState(false);
    const { copyToClipboard, status } = useCopyText();
    const maxHeight = 120;
    const isGenerating = useChatStore(state => state.isGenerating);
    useEffect(() => {
        if (messageRef.current) {
            setShowExpandButton(messageRef.current.scrollHeight > maxHeight);
        }
    }, [message]);

    const handleCopy = useCallback(() => {
        if (messageRef.current) {
            copyToClipboard(messageRef.current);
        }
    }, [copyToClipboard]);

    const toggleExpand = useCallback(() => setIsExpanded(prev => !prev), []);

    return (
        <div className="flex w-full flex-col items-end gap-3 group/message">
            {imageAttachment && <ImageMessage imageAttachment={imageAttachment} />}
            <div
                className={cn(
                    'text-foreground bg-primary/[0.03] dark:bg-white/[0.03] backdrop-blur-md relative max-w-[85%] overflow-visible rounded-3xl border border-primary/10 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-md hover:bg-primary/[0.05] dark:hover:bg-white/[0.05]',
                    isEditing && 'ring-2 ring-primary/20 bg-background shadow-xl'
                )}
            >
                {!isEditing && (
                    <>
                        <div
                            ref={messageRef}
                            className={cn('prose-sm relative px-5 py-3 font-medium text-base leading-relaxed', {
                                'pb-14': isExpanded,
                                markdownStyles,
                            })}
                            style={{
                                maxHeight: isExpanded ? 'none' : maxHeight,
                                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        >
                            {message}
                        </div>

                        <div
                            className={cn(
                                'absolute -bottom-3 -left-2 z-20 opacity-0 group-hover/message:opacity-100 transition-all duration-300 translate-y-2 group-hover/message:translate-y-0 flex flex-row items-center gap-1.5',
                                showExpandButton && 'opacity-100 translate-y-0'
                            )}
                        >
                            <div className="bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-1 shadow-xl flex items-center gap-1">
                                {showExpandButton && (
                                    <Button
                                        variant="ghost"
                                        size="xs"
                                        className="h-7 px-3 text-[10px] font-bold uppercase tracking-wider rounded-xl"
                                        onClick={toggleExpand}
                                    >
                                        {isExpanded ? 'Less' : 'More'}
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="icon-xs"
                                    className="h-7 w-7 rounded-xl"
                                    onClick={handleCopy}
                                    tooltip={status === 'copied' ? 'Copied' : 'Copy'}
                                >
                                    {status === 'copied' ? (
                                        <IconCheck size={14} strokeWidth={2.5} />
                                    ) : (
                                        <IconCopy size={14} strokeWidth={2.5} className="text-muted-foreground" />
                                    )}
                                </Button>
                                <Button
                                    disabled={
                                        isGenerating ||
                                        threadItem.status === 'QUEUED' ||
                                        threadItem.status === 'PENDING'
                                    }
                                    variant="ghost"
                                    size="icon-xs"
                                    className="h-7 w-7 rounded-xl"
                                    tooltip="Edit"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <IconPencil size={14} strokeWidth={2.5} className="text-muted-foreground" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {isEditing && (
                    <EditMessage
                        width={messageRef.current?.offsetWidth}
                        message={message}
                        threadItem={threadItem}
                        onCancel={() => {
                            setIsEditing(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
});

export type TEditMessage = {
    message: string;
    onCancel: () => void;
    threadItem: ThreadItem;
    width?: number;
};

export const EditMessage = memo(({ message, onCancel, threadItem, width }: TEditMessage) => {
    const { handleSubmit } = useAgentStream();
    const removeFollowupThreadItems = useChatStore(state => state.removeFollowupThreadItems);
    const getThreadItems = useChatStore(state => state.getThreadItems);

    const { editor } = useChatEditor({
        defaultContent: message,
    });

    const handleSave = async (query: string) => {
        if (!query.trim()) {
            toast.error('Please enter a message');
            return;
        }
        removeFollowupThreadItems(threadItem.id);

        const formData = new FormData();
        formData.append('query', query);
        formData.append('imageAttachment', threadItem.imageAttachment || '');
        const threadItems = await getThreadItems(threadItem.threadId);

        handleSubmit({
            formData,
            existingThreadItemId: threadItem.id,
            messages: threadItems,
            newChatMode: threadItem.mode,
            useWebSearch: false, //
        });
    };

    return (
        <div className="relative flex max-w-full flex-col items-end gap-2">
            <div
                className={cn(' relative px-3 py-0 text-base font-normal', {})}
                style={{
                    minWidth: width,
                    transition: 'max-height 0.3s ease-in-out',
                }}
            >
                <ChatEditor
                    maxHeight="100px"
                    editor={editor}
                    sendMessage={() => {
                        handleSave(editor?.getText() || '');
                    }}
                    className={cn('prose-sm max-w-full overflow-y-scroll !p-0', markdownStyles)}
                />
            </div>
            <div className={cn('flex-col items-center  group-hover:flex')}>
                <div className=" flex w-full items-center justify-end gap-1 bg-gradient-to-b from-transparent p-1.5">
                    <Button
                        size="xs"
                        onClick={() => {
                            handleSave(editor?.getText() || '');
                        }}
                        tooltip={status === 'copied' ? 'Copied' : 'Copy'}
                    >
                        Save
                    </Button>
                    <Button variant="bordered" size="xs" tooltip="Edit" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
});

Message.displayName = 'Message';
