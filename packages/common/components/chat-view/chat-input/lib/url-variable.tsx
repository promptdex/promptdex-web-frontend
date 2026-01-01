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
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <div className={cn(
                "flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] min-w-[200px] group",
                isValid ? "border-white/10 dark:border-white/5 focus-within:border-primary/20" : "border-red-500/50 focus-within:border-red-500/50"
            )}>
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                    <IconLink size={12} className="opacity-70" />
                    <span>{label}</span>
                </div>
                <Input
                    type="url"
                    value={value}
                    onChange={onChange}
                    placeholder="https://..."
                    className="h-full border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-sm font-medium placeholder:text-muted-foreground/20 w-full"
                    onKeyDown={(e) => e.stopPropagation()}
                />
            </div>
        </NodeViewWrapper>
    );
};
