import { useChatStore } from '@repo/common/store';
import { Button, cn, Popover, PopoverContent, PopoverTrigger } from '@repo/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const TableOfMessages = () => {
    const { threadId } = useParams();
    const currentThreadId = threadId?.toString() ?? '';
    const [isHovering, setIsHovering] = useState(false);
    const previousThreadItems = useChatStore(
        useShallow(state => state.getPreviousThreadItems(currentThreadId))
    );
    const currentThreadItem = useChatStore(
        useShallow(state => state.getCurrentThreadItem(currentThreadId))
    );
    const activeItemId = useChatStore(state => state.activeThreadItemView);
    const allItems = [...previousThreadItems, currentThreadItem].filter(Boolean);

    if (allItems?.length <= 1) {
        return null;
    }

    return (
        <div
            className="absolute left-4 top-1/2 z-[10] flex -translate-y-1/2 flex-col items-end gap-1.5"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <Popover open={isHovering} onOpenChange={setIsHovering}>
                <PopoverTrigger asChild>
                    <div className="flex h-16 w-10 flex-col items-start justify-center gap-2">
                        {allItems.map((item, index) => {
                            const isActive = activeItemId === item?.id;
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        'h-[1.5px] cursor-pointer rounded-full transition-all duration-300',
                                        isActive ? 'bg-primary w-6' : 'bg-foreground/10 w-3 hover:bg-foreground/30 hover:w-5'
                                    )}
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (item?.id) {
                                            const element = document.getElementById(
                                                `thread-item-${item.id}`
                                            );
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                />
                            );
                        })}
                    </div>
                </PopoverTrigger>
                <AnimatePresence>
                    {isHovering && (
                        <PopoverContent
                            asChild
                            sideOffset={0}
                            side="right"
                            align="center"
                            className="relative z-[10] max-w-[280px] p-0 border-none bg-transparent shadow-none"
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full rounded-2xl bg-background/80 backdrop-blur-xl border border-border/40 p-1.5 shadow-2xl overflow-hidden"
                            >
                                <div className="no-scrollbar max-h-72 overflow-y-auto flex flex-col gap-0.5">
                                    <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 border-b border-border/10 mb-1">
                                        Thread Contents
                                    </div>
                                    {allItems.map((item, index) => {
                                        const isActive = activeItemId === item?.id;
                                        return (
                                            <Button
                                                onClick={e => {
                                                    e.stopPropagation();
                                                    if (item?.id) {
                                                        const element = document.getElementById(
                                                            `thread-item-${item.id}`
                                                        );
                                                        element?.scrollIntoView({
                                                            behavior: 'smooth',
                                                        });
                                                    }
                                                }}
                                                variant="ghost"
                                                key={index}
                                                className={cn(
                                                    'text-muted-foreground hover:text-foreground group line-clamp-2 h-auto min-h-8 w-full max-w-full cursor-pointer justify-start overflow-hidden whitespace-normal py-2 px-3 text-left text-xs rounded-xl transition-all duration-200',
                                                    isActive && 'bg-primary/5 text-primary font-bold'
                                                )}
                                            >
                                                {item?.query}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </PopoverContent>
                    )}
                </AnimatePresence>
            </Popover>
        </div>
    );
};
