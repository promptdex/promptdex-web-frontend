import { NodeViewWrapper } from '@tiptap/react';
import { cn, Textarea } from '@repo/ui';
import { IconCode } from '@tabler/icons-react';

interface CodeVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CodeVariable: React.FC<CodeVariableProps> = ({ label, value, onChange }) => {
    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-top my-4 w-full max-w-[600px]">
            <div className="flex flex-col gap-2 p-4 rounded-3xl bg-zinc-900/80 backdrop-blur-md border border-white/10 transition-all hover:border-white/20 group animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-1">
                    <IconCode size={14} />
                    <span>{label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto">Code Block</span>
                </div>
                <Textarea
                    value={value}
                    onChange={onChange}
                    placeholder="// Enter your code here..."
                    className="min-h-[160px] w-full resize-y border-0 bg-zinc-950/50 rounded-xl p-4 focus-visible:ring-1 focus-visible:ring-primary/30 shadow-none font-mono text-sm leading-relaxed placeholder:text-muted-foreground/20 text-green-400"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            const target = e.target as HTMLTextAreaElement;
                            const start = target.selectionStart;
                            const end = target.selectionEnd;
                            const newValue = value.substring(0, start) + '    ' + value.substring(end);
                            onChange({ target: { value: newValue } } as any);
                            setTimeout(() => {
                                target.selectionStart = target.selectionEnd = start + 4;
                            }, 0);
                        }
                    }}
                />
            </div>
        </NodeViewWrapper>
    );
};
