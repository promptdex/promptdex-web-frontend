import { NodeViewWrapper } from '@tiptap/react';
import { cn, Textarea } from '@repo/ui';

interface TextareaVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextareaVariable: React.FC<TextareaVariableProps> = ({ label, value, onChange }) => {
    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-top my-4 w-full max-w-[550px]">
            <div className="flex flex-col gap-2 p-4 rounded-3xl bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 group animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
                    <span>{label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Extended Input</span>
                </div>
                <Textarea
                    value={value}
                    onChange={onChange}
                    placeholder={`Enter ${label}...`}
                    className="min-h-[120px] w-full resize-y border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-lg leading-relaxed placeholder:text-muted-foreground/20 font-medium"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </NodeViewWrapper>
    );
};
