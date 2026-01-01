import { NodeViewWrapper } from '@tiptap/react';
import { Textarea } from '@repo/ui';

interface TextareaVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextareaVariable: React.FC<TextareaVariableProps> = ({ label, value, onChange }) => {
    return (
        <NodeViewWrapper as="span" className="block my-2 w-full max-w-full">
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 group">
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 px-1 select-none">
                    {label}
                </div>
                <Textarea
                    value={value}
                    onChange={onChange}
                    placeholder={`Type...`}
                    className="min-h-[80px] w-full resize-y border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-sm leading-relaxed placeholder:text-muted-foreground/20 font-medium"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </NodeViewWrapper>
    );
};
