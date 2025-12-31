import { NodeViewWrapper } from '@tiptap/react';
import { cn, Badge } from '@repo/ui';
import { IconX, IconCheck } from '@tabler/icons-react';

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

    const toggleOption = (opt: string) => {
        const newSelected = selected.includes(opt)
            ? selected.filter(s => s !== opt)
            : [...selected, opt];
        onChange(newSelected.join(','));
    };

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-top my-4 w-full max-w-[550px]">
            <div className="flex flex-col gap-3 p-4 rounded-3xl bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
                    <span>{label}</span>
                    <span className="opacity-60">{selected.length} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {options.map((opt, i) => {
                        const isSelected = selected.includes(opt);
                        return (
                            <button
                                key={i}
                                onClick={() => toggleOption(opt)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium",
                                    isSelected
                                        ? "bg-primary/10 border-primary/30 text-primary"
                                        : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded border flex items-center justify-center transition-all",
                                    isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                                )}>
                                    {isSelected && <IconCheck size={12} className="text-primary-foreground" />}
                                </div>
                                {opt}
                            </button>
                        );
                    })}
                </div>
                {selected.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                        {selected.map((s, i) => (
                            <Badge key={i} variant="secondary" className="gap-1 pr-1 pl-2 py-1 text-xs bg-primary/10 text-primary rounded-lg">
                                {s}
                                <button onClick={() => toggleOption(s)} className="hover:bg-primary/20 rounded p-0.5">
                                    <IconX size={10} />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
};
