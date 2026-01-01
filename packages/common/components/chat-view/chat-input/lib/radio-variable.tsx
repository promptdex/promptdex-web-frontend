import { NodeViewWrapper } from '@tiptap/react';
import { cn, Popover, PopoverTrigger, PopoverContent } from '@repo/ui';
import { IconCircleDot, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';

interface RadioVariableProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export const RadioVariable: React.FC<RadioVariableProps> = ({ label, value, options, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[160px] group">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                            <IconCircleDot size={12} className="opacity-70" />
                            {label}
                        </div>
                        <div className="flex items-center gap-1 ml-auto">
                            <span className={cn("text-xs font-medium truncate max-w-[100px]", value ? "text-primary" : "text-muted-foreground/50")}>
                                {value || "Select..."}
                            </span>
                            <IconChevronDown size={12} className="text-muted-foreground/50" />
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-[180px] p-1.5" align="start">
                    <div className="flex flex-col gap-0.5">
                        {options.map((opt, i) => {
                            const isSelected = value === opt;
                            return (
                                <button
                                    key={i}
                                    onClick={() => {
                                        onChange(opt);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors text-sm w-full text-left",
                                        isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-foreground"
                                    )}
                                >
                                    <div className={cn(
                                        "w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all",
                                        isSelected ? "border-primary" : "border-muted-foreground/30"
                                    )}>
                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
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
