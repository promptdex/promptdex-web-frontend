import { NodeViewWrapper } from '@tiptap/react';
import { cn } from '@repo/ui';

interface RangeVariableProps {
    label: string;
    value: string;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: string) => void;
}

export const RangeVariable: React.FC<RangeVariableProps> = ({
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    onChange
}) => {
    const numValue = Number(value) || min;
    const percentage = ((numValue - min) / (max - min)) * 100;

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="flex flex-col gap-2 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[240px] animate-in fade-in duration-500">
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-0.5">
                    <span>{label}</span>
                    <span className="text-foreground text-sm font-bold">{numValue}</span>
                </div>
                <div className="relative h-2">
                    <div className="absolute inset-0 rounded-full bg-white/10" />
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-primary/60 transition-all"
                        style={{ width: `${percentage}%` }}
                    />
                    <input
                        type="range"
                        value={numValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                <div className="flex justify-between text-[9px] text-muted-foreground/40">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        </NodeViewWrapper>
    );
};
