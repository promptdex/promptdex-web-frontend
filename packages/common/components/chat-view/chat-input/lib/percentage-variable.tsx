import { NodeViewWrapper } from '@tiptap/react';
import { cn, Input } from '@repo/ui';
import { IconPercentage } from '@tabler/icons-react';

interface PercentageVariableProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const PercentageVariable: React.FC<PercentageVariableProps> = ({ label, value, onChange }) => {
    const numValue = parseFloat(value) || 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = parseFloat(e.target.value);
        if (isNaN(val)) val = 0;
        if (val < 0) val = 0;
        if (val > 100) val = 100;
        onChange(String(val));
    };

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 min-w-[140px] group relative overflow-hidden">
                <div
                    className="absolute bottom-0 left-0 h-[2px] bg-primary/50 transition-all pointer-events-none"
                    style={{ width: `${numValue}%` }}
                />
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                    <IconPercentage size={12} className="opacity-70" />
                    <span>{label}</span>
                </div>
                <div className="flex items-center gap-1 flex-1">
                    <Input
                        type="number"
                        value={value}
                        onChange={handleChange}
                        min={0}
                        max={100}
                        step={1}
                        placeholder="0"
                        className="h-full border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-sm font-medium placeholder:text-muted-foreground/20 w-full text-right"
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                    <span className="text-xs font-medium text-muted-foreground/60">%</span>
                </div>
            </div>
        </NodeViewWrapper>
    );
};
