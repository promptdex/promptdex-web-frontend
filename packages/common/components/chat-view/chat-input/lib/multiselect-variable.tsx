import { NodeViewWrapper } from '@tiptap/react';
import { cn, Badge, Popover, PopoverTrigger, PopoverContent } from '@repo/ui';
import { IconCheck, IconChevronDown, IconListCheck } from '@tabler/icons-react';
import { useState } from 'react';

interface MultiselectVariableProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export const MultiselectVariable: React.FC<MultiselectVariableProps> = ({
    label,
    value,
    options,
    onChange,
}) => {
    const selected = value ? value.split(',').filter(Boolean) : [];
    const [open, setOpen] = useState(false);

    const toggleOption = (opt: string) => {
        const newSelected = selected.includes(opt)
            ? selected.filter(s => s !== opt)
            : [...selected, opt];
        onChange(newSelected.join(','));
    };

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[180px] group">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                            <IconListCheck size={12} className="opacity-70" />
                            {label}
                        </div>
                        <div className="flex items-center gap-1 ml-auto">
                            {selected.length > 0 ? (
                                <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-primary/20 text-primary border-0">
                                    {selected.length} selected
                                </Badge>
                            ) : (
                                <span className="text-xs text-muted-foreground/50">Select...</span>
                            )}
                            <IconChevronDown size={12} className="text-muted-foreground/50" />
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-1.5" align="start">
                    <div className="flex flex-col gap-0.5">
                        {options.map((opt, i) => {
                            const isSelected = selected.includes(opt);
                            return (
                                <button
                                    key={i}
                                    onClick={() => toggleOption(opt)}
                                    className={cn(
                                        "flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors text-sm w-full text-left",
                                        isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-foreground"
                                    )}
                                >
                                    <div className={cn(
                                        "w-3.5 h-3.5 rounded border flex items-center justify-center transition-all",
                                        isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                                    )}>
                                        {isSelected && <IconCheck size={10} className="text-primary-foreground" />}
                                    </div>
                                    <span className="truncate">{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
};
