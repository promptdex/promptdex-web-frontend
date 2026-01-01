import { NodeViewWrapper } from '@tiptap/react';
import { cn } from '@repo/ui';
import { IconCheck } from '@tabler/icons-react';

interface CheckboxVariableProps {
    label: string;
    value: string;
    onChange: (checked: boolean) => void;
}

export const CheckboxVariable: React.FC<CheckboxVariableProps> = ({ label, value, onChange }) => {
    const isChecked = value === 'true' || value === 'yes' || value === '1';

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <button
                onClick={() => onChange(!isChecked)}
                className={cn(
                    "flex items-center gap-2 h-9 px-3 rounded-lg border transition-all hover:bg-white/[0.05] min-w-[120px] group select-none",
                    isChecked
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-white/[0.03] dark:bg-black/[0.1] border-white/10 dark:border-white/5 text-muted-foreground"
                )}
            >
                <div className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-all",
                    isChecked ? "bg-primary border-primary" : "border-muted-foreground/40 bg-transparent"
                )}>
                    {isChecked && <IconCheck size={10} className="text-primary-foreground" />}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider">
                    {label}
                </div>
            </button>
        </NodeViewWrapper>
    );
};
