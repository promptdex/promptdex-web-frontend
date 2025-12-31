import { NodeViewWrapper } from '@tiptap/react';
import { cn } from '@repo/ui';

interface CheckboxVariableProps {
    label: string;
    value: string;
    onChange: (checked: boolean) => void;
}

export const CheckboxVariable: React.FC<CheckboxVariableProps> = ({ label, value, onChange }) => {
    const isChecked = value === 'true' || value === 'yes' || value === '1';

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <button
                onClick={() => onChange(!isChecked)}
                className={cn(
                    "flex items-center gap-3 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[140px] animate-in fade-in duration-500",
                    isChecked && "border-primary/30 bg-primary/5"
                )}
            >
                <div className={cn(
                    "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                    isChecked ? "bg-primary border-primary" : "border-muted-foreground/30"
                )}>
                    {isChecked && (
                        <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>
                <span className="text-sm font-medium">{label}</span>
            </button>
        </NodeViewWrapper>
    );
};
