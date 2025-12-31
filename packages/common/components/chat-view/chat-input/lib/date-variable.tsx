import { NodeViewWrapper } from '@tiptap/react';
import { cn, Input } from '@repo/ui';

interface DateVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateVariable: React.FC<DateVariableProps> = ({ label, value, onChange }) => {
    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="flex flex-col gap-1 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 min-w-[180px] animate-in fade-in duration-500">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 w-full px-0.5">
                    {label}
                </div>
                <Input
                    type="date"
                    value={value}
                    onChange={onChange}
                    className={cn(
                        "h-7 border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-lg font-medium"
                    )}
                    onKeyDown={(e) => e.stopPropagation()}
                />
            </div>
        </NodeViewWrapper>
    );
};
