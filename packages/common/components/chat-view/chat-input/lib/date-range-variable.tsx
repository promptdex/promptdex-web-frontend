import { NodeViewWrapper } from '@tiptap/react';
import { cn, Calendar, Popover, PopoverContent, PopoverTrigger, type DateRange } from '@repo/ui';
import { IconCalendarWeek } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface DateRangeVariableProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const DateRangeVariable: React.FC<DateRangeVariableProps> = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);

    // Parse value "YYYY-MM-DD to YYYY-MM-DD"
    const parseValue = (val: string): DateRange | undefined => {
        if (!val) return undefined;
        try {
            const [startStr, endStr] = val.split(' to ');
            return {
                from: startStr ? new Date(startStr) : undefined,
                to: endStr ? new Date(endStr) : undefined,
            };
        } catch {
            return undefined;
        }
    };

    const rangeValue = parseValue(value);

    const handleSelect = (range: DateRange | undefined) => {
        if (range?.from) {
            const start = format(range.from, 'yyyy-MM-dd');
            const end = range.to ? format(range.to, 'yyyy-MM-dd') : '';
            if (end) {
                onChange(`${start} to ${end}`);
            } else {
                onChange(`${start}`);
            }
        } else {
            onChange('');
        }
    };

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[200px] group">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                            <IconCalendarWeek size={12} className="opacity-70" />
                            {label}
                        </div>
                        <div className={cn("text-xs font-medium ml-auto truncate max-w-[140px]", !rangeValue?.from && "text-muted-foreground/50")}>
                            {rangeValue?.from ? (
                                rangeValue.to ? (
                                    <>
                                        {format(rangeValue.from, 'LLL dd, y')} - {format(rangeValue.to, 'LLL dd, y')}
                                    </>
                                ) : (
                                    format(rangeValue.from, 'LLL dd, y')
                                )
                            ) : (
                                "Pick dates"
                            )}
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={rangeValue?.from}
                        selected={rangeValue}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
};
