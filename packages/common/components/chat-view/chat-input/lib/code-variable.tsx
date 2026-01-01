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
        <NodeViewWrapper as="span" className="block my-2 w-full max-w-full">
            <div className="flex flex-col rounded-xl bg-zinc-950/50 border border-white/10 overflow-hidden group">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 border-b border-white/5">
                    <IconCode size={12} className="text-muted-foreground" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/70 select-none">{label}</span>
                </div>
                <Textarea
                    value={value}
                    onChange={onChange}
                    placeholder="// content..."
                    className="min-h-[120px] w-full resize-y border-0 bg-transparent p-3 focus-visible:ring-0 shadow-none font-mono text-sm leading-relaxed placeholder:text-muted-foreground/20 text-green-400"
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
