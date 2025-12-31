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
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="flex flex-col gap-1 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 min-w-[180px] animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-0.5">
                    <IconPercentage size={12} />
                    <span>{label}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        value={value}
                        onChange={handleChange}
                        min={0}
                        max={100}
                        step={1}
                        placeholder="0"
                        className="h-7 border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-lg font-medium placeholder:text-muted-foreground/20 flex-1"
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                    <span className="text-lg font-bold text-muted-foreground/60">%</span>
                </div>
                <div className="relative h-2 mt-1">
                    <div className="absolute inset-0 rounded-full bg-white/10" />
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-primary/60 transition-all"
                        style={{ width: `${numValue}%` }}
                    />
                </div>
            </div>
        </NodeViewWrapper>
    );
};
