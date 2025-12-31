import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import React, { useEffect, useState } from 'react';
import {
    cn,
    Input,
    Textarea,
    Badge,
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@repo/ui';
import { IconChevronDown, IconX } from '@tabler/icons-react';

export const VariableNodeView: React.FC<NodeViewProps> = (props) => {
    const [value, setValue] = useState(props.node.attrs.value || '');
    const type = props.node.attrs.type || 'text';
    const options = props.node.attrs.options || [];

    const [tags, setTags] = useState<string[]>(value ? value.split('\n').map((t: string) => t.replace('• ', '')).filter(Boolean) : []);
    const [tagInput, setTagInput] = useState('');

    useEffect(() => {
        // Sync local state if node attributes change externally (e.g. undo/redo)
        setValue(props.node.attrs.value || '');
        if (type === 'tags' && props.node.attrs.value) {
            setTags(props.node.attrs.value.split('\n').map((t: string) => t.replace('• ', '')).filter(Boolean));
        }
    }, [props.node.attrs.value, type]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        props.updateAttributes({
            value: newValue
        });
    };

    const handleSelectChange = (newValue: string) => {
        setValue(newValue);
        props.updateAttributes({
            value: newValue
        });
    };

    const handleTagsChange = (newTags: string[]) => {
        setTags(newTags);
        // Format as bullet points
        const formatted = newTags.map(t => `• ${t}`).join('\n');
        setValue(formatted);
        props.updateAttributes({ value: formatted });
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            const newTag = tagInput.trim().replace(/^•\s*/, ''); // Remove bullet if user typed it
            if (!tags.includes(newTag)) {
                handleTagsChange([...tags, newTag]);
            }
            setTagInput('');
        } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
            handleTagsChange(tags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        handleTagsChange(tags.filter(t => t !== tagToRemove));
    };

    if (type === 'textarea') {
        return (
            <NodeViewWrapper as="span" className="inline-block mx-1 align-top my-4 w-full max-w-[550px]">
                <div className="flex flex-col gap-2 p-4 rounded-3xl bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 group animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
                        <span>{props.node.attrs.label}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Extended Input</span>
                    </div>
                    <Textarea
                        value={value}
                        onChange={handleChange}
                        placeholder={`Enter ${props.node.attrs.label}...`}
                        className="min-h-[120px] w-full resize-y border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-lg leading-relaxed placeholder:text-muted-foreground/20 font-medium"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            </NodeViewWrapper>
        );
    }

    if (type === 'tags') {
        return (
            <NodeViewWrapper as="span" className="inline-block mx-1 align-top my-4 w-full max-w-[550px]">
                <div className="flex flex-col gap-3 p-4 rounded-3xl bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 group animate-in fade-in slide-in-from-top-2 duration-500">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
                        <span>{props.node.attrs.label}</span>
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
                                    onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                                    className="rounded-full hover:bg-muted p-0.5 transition-colors"
                                >
                                    <IconX size={12} />
                                </button>
                            </Badge>
                        ))}
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagInputKeyDown}
                            placeholder={tags.length ? "" : "Add item..."}
                            className="bg-transparent outline-none flex-1 min-w-[140px] text-lg h-9 placeholder:text-muted-foreground/20 font-medium"
                        />
                    </div>
                </div>
            </NodeViewWrapper>
        );
    }

    if (type === 'select' || type === 'dropdown') {
        return (
            <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outlined"
                            className={cn(
                                "h-14 min-w-[240px] justify-between px-5 text-sm font-semibold rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] border-white/10 dark:border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-md group animate-in fade-in duration-500",
                                !value && "text-muted-foreground"
                            )}
                        >
                            <div className="flex flex-col items-start gap-1 text-left">
                                <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-black px-0.5">{props.node.attrs.label}</span>
                                <span className="truncate max-w-[160px] text-base group-hover:text-foreground transition-colors">{value || `Select Option`}</span>
                            </div>
                            <IconChevronDown className="h-4 w-4 opacity-40 ml-4 group-hover:opacity-80 transition-opacity" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[240px] rounded-2xl shadow-2xl border-white/10 bg-background/95 backdrop-blur-xl p-1.5">
                        <DropdownMenuItem disabled className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] pb-3 pt-2 px-3">
                            {props.node.attrs.label}
                        </DropdownMenuItem>
                        {options.map((opt: string, i: number) => (
                            <DropdownMenuItem
                                key={i}
                                onClick={() => handleSelectChange(opt)}
                                className={cn(
                                    "rounded-xl px-3 py-2 text-sm transition-all focus:bg-primary/10 focus:text-primary",
                                    value === opt && "bg-primary/10 text-primary font-bold"
                                )}
                            >
                                {opt}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </NodeViewWrapper>
        );
    }

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="flex flex-col gap-1 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 min-w-[200px] animate-in fade-in duration-500">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 w-full px-0.5">
                    {props.node.attrs.label}
                </div>
                <Input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    placeholder={`Type ${props.node.attrs.label}...`}
                    className={cn(
                        "h-7 border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-lg font-medium placeholder:text-muted-foreground/20",
                        !value && "italic"
                    )}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            // Focus next field logic
                        }
                        e.stopPropagation();
                    }}
                />
            </div>
        </NodeViewWrapper>
    );
};
