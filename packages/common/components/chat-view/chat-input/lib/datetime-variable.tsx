import { NodeViewWrapper } from '@tiptap/react';
import { cn, Input } from '@repo/ui';
import { IconCalendarTime } from '@tabler/icons-react';

interface DatetimeVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatetimeVariable: React.FC<DatetimeVariableProps> = ({ label, value, onChange }) => {
    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="flex flex-col gap-1 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 min-w-[260px] animate-in fade-in duration-500">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-0.5">
                    <IconCalendarTime size={12} />
                    <span>{label}</span>
                </div>
                <Input
                    type="datetime-local"
                    value={value}
                    onChange={onChange}
                    className="h-7 border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-lg font-medium"
                    onKeyDown={(e) => e.stopPropagation()}
                />
            </div>
        </NodeViewWrapper>
    );
};
