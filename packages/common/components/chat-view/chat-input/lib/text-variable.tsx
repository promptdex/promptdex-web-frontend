import { NodeViewWrapper } from '@tiptap/react';
import { cn, Input } from '@repo/ui';

interface TextVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextVariable: React.FC<TextVariableProps> = ({ label, value, onChange }) => {
    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 min-w-[200px] group">
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                    {label}
                </div>
                <Input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={`Type...`}
                    className={cn(
                        "h-full border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-sm font-medium placeholder:text-muted-foreground/20 w-full",
                        !value && "italic"
                    )}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            // Optional: Focus next
                        }
                        e.stopPropagation();
                    }}
                />
            </div>
        </NodeViewWrapper>
    );
};
