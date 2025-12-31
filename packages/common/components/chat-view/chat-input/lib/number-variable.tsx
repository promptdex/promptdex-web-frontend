import { NodeViewWrapper } from '@tiptap/react';
import { cn, Input } from '@repo/ui';

interface NumberVariableProps {
    label: string;
    value: string;
    min?: number;
    max?: number;
    step?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberVariable: React.FC<NumberVariableProps> = ({
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    onChange
}) => {
    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="flex flex-col gap-1 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 min-w-[160px] animate-in fade-in duration-500">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 w-full px-0.5">
                    {label}
                </div>
                <Input
                    type="number"
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    placeholder="0"
                    className={cn(
                        "h-7 border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-lg font-medium placeholder:text-muted-foreground/20"
                    )}
                    onKeyDown={(e) => e.stopPropagation()}
                />
            </div>
        </NodeViewWrapper>
    );
};
