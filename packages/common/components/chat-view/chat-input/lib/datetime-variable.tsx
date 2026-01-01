import { NodeViewWrapper } from '@tiptap/react';
import { cn, Calendar, Popover, PopoverContent, PopoverTrigger } from '@repo/ui';
import { IconCalendarTime } from '@tabler/icons-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface DatetimeVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
}

export const DatetimeVariable: React.FC<DatetimeVariableProps> = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);

    // value expected: YYYY-MM-DDTHH:mm
    const dateValue = value ? new Date(value) : undefined;

    const [time, setTime] = useState(value ? format(new Date(value), 'HH:mm') : '12:00');

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            const [h, m] = time.split(':');
            date.setHours(parseInt(h));
            date.setMinutes(parseInt(m));
            const formatted = format(date, "yyyy-MM-dd'T'HH:mm");
            onChange({ target: { value: formatted } });
        } else {
            // keep time, just no date? or clear everything? 
            // usually clear everything
            onChange({ target: { value: '' } });
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);
        if (dateValue) {
            const [h, m] = newTime.split(':');
            const newDate = new Date(dateValue);
            newDate.setHours(parseInt(h));
            newDate.setMinutes(parseInt(m));
            const formatted = format(newDate, "yyyy-MM-dd'T'HH:mm");
            onChange({ target: { value: formatted } });
        }
    };

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[200px] group">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                            <IconCalendarTime size={12} className="opacity-70" />
                            {label}
                        </div>
                        <div className={cn("text-xs font-medium ml-auto", !dateValue && "text-muted-foreground/50")}>
                            {dateValue ? format(dateValue, 'PPP HH:mm') : "Pick date & time"}
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={dateValue}
                        onSelect={handleDateSelect}
                        initialFocus
                        className="rounded-t-md border-b"
                    />
                    <div className="p-3 bg-muted/20 border-t flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">Time:</span>
                        <input
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-primary"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
};
