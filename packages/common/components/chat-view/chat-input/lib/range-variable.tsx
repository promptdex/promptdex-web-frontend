import { NodeViewWrapper } from '@tiptap/react';

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
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <div className="flex items-center gap-3 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[180px] group relative overflow-hidden">
                <div
                    className="absolute bottom-0 left-0 h-[2px] bg-primary/50 transition-all pointer-events-none"
                    style={{ width: `${percentage}%` }}
                />

                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                    {label}
                </div>

                <div className="relative flex-1 h-full flex items-center">
                    <input
                        type="range"
                        value={numValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full h-full opacity-0 cursor-pointer absolute inset-0 z-10"
                    />
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary/60 transition-all rounded-full"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                <div className="text-xs font-mono font-medium text-muted-foreground min-w-[20px] text-right pointer-events-none">
                    {numValue}
                </div>
            </div>
        </NodeViewWrapper>
    );
};
