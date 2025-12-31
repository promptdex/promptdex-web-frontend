import { NodeViewWrapper } from '@tiptap/react';
import { cn, Input } from '@repo/ui';
import { IconLink } from '@tabler/icons-react';

interface UrlVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UrlVariable: React.FC<UrlVariableProps> = ({ label, value, onChange }) => {
    const isValid = !value || /^https?:\/\/.+/.test(value);

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className={cn(
                "flex flex-col gap-1 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] min-w-[280px] animate-in fade-in duration-500",
                isValid ? "border-white/10 dark:border-white/5 focus-within:border-primary/20" : "border-red-500/50"
            )}>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-0.5">
                    <IconLink size={12} />
                    <span>{label}</span>
                </div>
                <Input
                    type="url"
                    value={value}
                    onChange={onChange}
                    placeholder="https://example.com"
                    className="h-7 border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-lg font-medium placeholder:text-muted-foreground/20"
                    onKeyDown={(e) => e.stopPropagation()}
                />
            </div>
        </NodeViewWrapper>
    );
};
