import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import { cn, Popover, PopoverContent, PopoverTrigger } from '@repo/ui';

interface ColorVariableProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const presetColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#3b82f6', '#8b5cf6', '#ec4899', '#64748b', '#000000',
];

export const ColorVariable: React.FC<ColorVariableProps> = ({ label, value, onChange }) => {
    const [showPicker, setShowPicker] = useState(false);
    const currentColor = value || '#3b82f6';

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={showPicker} onOpenChange={setShowPicker}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-3 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[140px] group">
                        <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                            {label}
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <div
                                className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                                style={{ backgroundColor: currentColor }}
                            />
                            <span className="text-xs font-mono text-muted-foreground">{currentColor}</span>
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3 flex flex-wrap gap-2" align="start">
                    {presetColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => {
                                onChange(color);
                                setShowPicker(false);
                            }}
                            className={cn(
                                "w-6 h-6 rounded-md border transition-transform hover:scale-125",
                                currentColor === color ? "border-white ring-2 ring-primary" : "border-white/20"
                            )}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    <input
                        type="color"
                        value={currentColor}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-6 h-6 rounded-md cursor-pointer border-0 p-0"
                    />
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
};
