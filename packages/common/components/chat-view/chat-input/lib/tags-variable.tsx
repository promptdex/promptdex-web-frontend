import { NodeViewWrapper } from '@tiptap/react';
import { Badge } from '@repo/ui';
import { IconX } from '@tabler/icons-react';

interface TagsVariableProps {
    label: string;
    tags: string[];
    tagInput: string;
    onTagInputChange: (value: string) => void;
    onTagInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onRemoveTag: (tag: string) => void;
}

export const TagsVariable: React.FC<TagsVariableProps> = ({
    label,
    tags,
    tagInput,
    onTagInputChange,
    onTagInputKeyDown,
    onRemoveTag,
}) => {
    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-top my-4 w-full max-w-[550px]">
            <div className="flex flex-col gap-3 p-4 rounded-3xl bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 group animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
                    <span>{label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Collection</span>
                </div>
                <div
                    className="flex flex-wrap gap-2 min-h-[40px] cursor-text"
                    onClick={(e) => {
                        e.stopPropagation();
                        const input = e.currentTarget.querySelector('input');
                        input?.focus();
                    }}
                >
                    {tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="gap-1.5 pr-1.5 pl-3 py-1.5 text-xs font-bold bg-white/5 hover:bg-white/10 border-white/10 text-foreground transition-colors rounded-xl">
                            {tag}
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemoveTag(tag); }}
                                className="rounded-full hover:bg-muted p-0.5 transition-colors"
                            >
                                <IconX size={12} />
                            </button>
                        </Badge>
                    ))}
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => onTagInputChange(e.target.value)}
                        onKeyDown={onTagInputKeyDown}
                        placeholder={tags.length ? "" : "Add item..."}
                        className="bg-transparent outline-none flex-1 min-w-[140px] text-lg h-9 placeholder:text-muted-foreground/20 font-medium"
                    />
                </div>
            </div>
        </NodeViewWrapper>
    );
};
