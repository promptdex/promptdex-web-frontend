import { NodeViewWrapper } from '@tiptap/react';
import { cn } from '@repo/ui';

interface RadioVariableProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export const RadioVariable: React.FC<RadioVariableProps> = ({ label, value, options, onChange }) => {
    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-top my-4 w-full max-w-[550px]">
            <div className="flex flex-col gap-3 p-4 rounded-3xl bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
                    {label}
                </div>
                <div className="flex flex-wrap gap-2">
                    {options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => onChange(opt)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium",
                                value === opt
                                    ? "bg-primary/10 border-primary/30 text-primary"
                                    : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                            )}
                        >
                            <div className={cn(
                                "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all",
                                value === opt ? "border-primary" : "border-muted-foreground/30"
                            )}>
                                {value === opt && <div className="w-2 h-2 rounded-full bg-primary" />}
                            </div>
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        </NodeViewWrapper>
    );
};
