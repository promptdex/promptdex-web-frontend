import { NodeViewWrapper } from '@tiptap/react';
import {
    cn,
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@repo/ui';
import { IconChevronDown } from '@tabler/icons-react';

interface SelectVariableProps {
    label: string;
    value: string;
    options: string[];
    onSelect: (value: string) => void;
}

export const SelectVariable: React.FC<SelectVariableProps> = ({
    label,
    value,
    options,
    onSelect,
}) => {
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
                            <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-black px-0.5">{label}</span>
                            <span className="truncate max-w-[160px] text-base group-hover:text-foreground transition-colors">{value || `Select Option`}</span>
                        </div>
                        <IconChevronDown className="h-4 w-4 opacity-40 ml-4 group-hover:opacity-80 transition-opacity" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[240px] rounded-2xl shadow-2xl border-white/10 bg-background/95 backdrop-blur-xl p-1.5">
                    <DropdownMenuItem disabled className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] pb-3 pt-2 px-3">
                        {label}
                    </DropdownMenuItem>
                    {options.map((opt, i) => (
                        <DropdownMenuItem
                            key={i}
                            onClick={() => onSelect(opt)}
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
};
