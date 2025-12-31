'use client';

import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import { cn, Button } from '@repo/ui';
import { IconMoodSmile } from '@tabler/icons-react';

interface EmojiVariableProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const EMOJI_GROUPS = {
    'Smileys': ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😍', '🥰', '😘', '😋', '🤔'],
    'Gestures': ['👍', '👎', '👌', '✌️', '🤞', '🤙', '👏', '🙌', '🤝', '🙏', '💪', '🎉', '🔥', '⭐', '❤️', '💯'],
    'Objects': ['💡', '📌', '📍', '🎯', '🚀', '💻', '📱', '⚡', '🔔', '📧', '📝', '✅', '❌', '⚠️', '💬', '🔗'],
};

export const EmojiVariable: React.FC<EmojiVariableProps> = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="relative">
                <Button
                    variant="outlined"
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-14 min-w-[140px] justify-between px-5 text-sm font-semibold rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] border-white/10 dark:border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-md group animate-in fade-in duration-500"
                >
                    <div className="flex flex-col items-start gap-1 text-left">
                        <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-black px-0.5">{label}</span>
                        <span className="text-2xl">{value || <IconMoodSmile size={24} className="text-muted-foreground/40" />}</span>
                    </div>
                </Button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[280px] overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-background/95 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 p-3">
                        {Object.entries(EMOJI_GROUPS).map(([group, emojis]) => (
                            <div key={group} className="mb-3 last:mb-0">
                                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-2">{group}</div>
                                <div className="grid grid-cols-8 gap-1">
                                    {emojis.map((emoji) => (
                                        <button
                                            key={emoji}
                                            onClick={() => {
                                                onChange(emoji);
                                                setIsOpen(false);
                                            }}
                                            className={cn(
                                                "text-xl p-1 rounded-lg transition-all hover:bg-primary/10 hover:scale-125",
                                                value === emoji && "bg-primary/20"
                                            )}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
};
