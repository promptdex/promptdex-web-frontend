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
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outlined"
                        className={cn(
                            "h-9 min-w-[160px] justify-between px-3 text-xs font-medium rounded-lg bg-white/[0.03] dark:bg-black/[0.1] border-white/10 dark:border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-md group",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <div className="flex items-center gap-2 text-left overflow-hidden">
                            <span className="text-[9px] uppercase tracking-wider opacity-50 font-bold shrink-0">{label}</span>
                            <span className="truncate max-w-[120px] text-foreground transition-colors">{value || `Select Option`}</span>
                        </div>
                        <IconChevronDown className="h-3 w-3 opacity-40 ml-2 group-hover:opacity-80 transition-opacity" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px] rounded-xl shadow-xl border-white/10 bg-background/95 backdrop-blur-xl p-1">
                    <DropdownMenuItem disabled className="text-muted-foreground text-[9px] font-bold uppercase tracking-wider pb-1.5 pt-1 px-2">
                        {label}
                    </DropdownMenuItem>
                    {options.map((opt, i) => (
                        <DropdownMenuItem
                            key={i}
                            onClick={() => onSelect(opt)}
                            className={cn(
                                "rounded-lg px-2 py-1.5 text-xs transition-all focus:bg-primary/10 focus:text-primary cursor-pointer",
                                value === opt && "bg-primary/5 text-primary font-medium"
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
