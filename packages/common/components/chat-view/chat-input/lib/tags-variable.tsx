import { NodeViewWrapper } from '@tiptap/react';
import { Badge } from '@repo/ui';
import { IconX, IconHash } from '@tabler/icons-react';

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
        <NodeViewWrapper as="span" className="block my-2 w-full max-w-full">
            <div className="flex flex-col gap-1.5 p-2 rounded-xl bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 group">
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 px-1 select-none">
                    <IconHash size={10} className="opacity-70" />
                    {label}
                </div>
                <div
                    className="flex flex-wrap gap-1.5 min-h-[32px] cursor-text"
                    onClick={(e) => {
                        e.stopPropagation();
                        const input = e.currentTarget.querySelector('input');
                        input?.focus();
                    }}
                >
                    {tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="gap-1 px-2 py-0.5 text-xs font-medium bg-white/5 hover:bg-white/10 border-white/10 text-foreground transition-colors rounded-md h-6">
                            {tag}
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemoveTag(tag); }}
                                className="rounded-full hover:bg-white/20 p-0.5 transition-colors"
                            >
                                <IconX size={10} />
                            </button>
                        </Badge>
                    ))}
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => onTagInputChange(e.target.value)}
                        onKeyDown={onTagInputKeyDown}
                        placeholder={tags.length ? "" : "Add tag..."}
                        className="bg-transparent outline-none flex-1 min-w-[80px] text-sm h-6 placeholder:text-muted-foreground/30 font-medium"
                    />
                </div>
            </div>
        </NodeViewWrapper>
    );
};
