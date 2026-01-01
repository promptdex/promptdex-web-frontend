'use client';

import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import { cn, Button, Popover, PopoverContent, PopoverTrigger } from '@repo/ui';
import { IconMoodSmile } from '@tabler/icons-react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface EmojiVariableProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const EmojiVariable: React.FC<EmojiVariableProps> = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outlined"
                        className={cn(
                            "h-9 min-w-[120px] justify-between px-3 text-xs font-medium rounded-lg bg-white/[0.03] dark:bg-black/[0.1] border-white/10 dark:border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-md group",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <div className="flex items-center gap-2 text-left overflow-hidden">
                            <span className="text-[9px] uppercase tracking-wider opacity-50 font-bold shrink-0">{label}</span>
                            <span className="text-base leading-none">{value || <IconMoodSmile size={16} className="text-muted-foreground/40" />}</span>
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-0 rounded-xl shadow-2xl bg-transparent" align="start">
                    <EmojiPicker
                        onEmojiClick={(emojiData: EmojiClickData) => {
                            onChange(emojiData.emoji);
                            setIsOpen(false);
                        }}
                        theme={Theme.AUTO}
                        lazyLoadEmojis={true}
                        width={300}
                        height={400}
                    />
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
};
