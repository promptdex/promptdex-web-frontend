import { NodeViewWrapper } from '@tiptap/react';
import { cn, Calendar, Popover, PopoverContent, PopoverTrigger } from '@repo/ui';
import { IconCalendar } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface DateVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
}

export const DateVariable: React.FC<DateVariableProps> = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);

    // Parse value (YYYY-MM-DD) to Date
    const dateValue = value ? new Date(value) : undefined;

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            // Format to YYYY-MM-DD
            const formatted = format(date, 'yyyy-MM-dd');
            onChange({ target: { value: formatted } });
            setOpen(false);
        } else {
            onChange({ target: { value: '' } });
        }
    };

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[150px] group">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                            <IconCalendar size={12} className="opacity-70" />
                            {label}
                        </div>
                        <div className={cn("text-xs font-medium ml-auto", !dateValue && "text-muted-foreground/50")}>
                            {dateValue ? format(dateValue, 'PPP') : "Pick a date"}
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={dateValue}
                        onSelect={handleSelect}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
};
