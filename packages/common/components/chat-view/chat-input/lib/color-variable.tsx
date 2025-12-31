import { NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';
import { cn } from '@repo/ui';

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
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="flex flex-col gap-2 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[200px] animate-in fade-in duration-500">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 w-full px-0.5">
                    {label}
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowPicker(!showPicker)}
                        className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-inner transition-transform hover:scale-110"
                        style={{ backgroundColor: currentColor }}
                    />
                    <span className="text-sm font-mono text-muted-foreground">{currentColor}</span>
                </div>
                {showPicker && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
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
                            className="w-6 h-6 rounded-md cursor-pointer"
                        />
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
};
