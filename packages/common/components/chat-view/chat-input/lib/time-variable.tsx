import { NodeViewWrapper } from '@tiptap/react';
import { cn, Popover, PopoverContent, PopoverTrigger } from '@repo/ui';
import { IconClock } from '@tabler/icons-react';
import { useState } from 'react';

interface TimeVariableProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
}

export const TimeVariable: React.FC<TimeVariableProps> = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);

    // value format: "HH:mm"
    const [hour, minute] = value ? value.split(':') : ['12', '00'];

    const handleTimeChange = (h: string, m: string) => {
        onChange({ target: { value: `${h}:${m}` } });
    };

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0')); // 5 min steps

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[120px] group">
                        <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                            <IconClock size={12} className="opacity-70" />
                            {label}
                        </div>
                        <div className={cn("text-xs font-medium ml-auto", !value && "text-muted-foreground/50")}>
                            {value || "00:00"}
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex bg-background rounded-md overflow-hidden border">
                        <div className="flex flex-col h-[200px] overflow-y-auto border-r scrollbar-hide">
                            <div className="px-2 py-1 text-[10px] bg-muted sticky top-0 font-bold text-center">HR</div>
                            {hours.map((h) => (
                                <button
                                    key={h}
                                    onClick={() => handleTimeChange(h, minute)}
                                    className={cn(
                                        "px-4 py-1.5 text-xs hover:bg-muted transition-colors",
                                        h === hour && "bg-primary text-primary-foreground hover:bg-primary"
                                    )}
                                >
                                    {h}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-col h-[200px] overflow-y-auto scrollbar-hide">
                            <div className="px-2 py-1 text-[10px] bg-muted sticky top-0 font-bold text-center">MIN</div>
                            {minutes.map((m) => (
                                <button
                                    key={m}
                                    onClick={() => handleTimeChange(hour, m)}
                                    className={cn(
                                        "px-4 py-1.5 text-xs hover:bg-muted transition-colors",
                                        m === minute && "bg-primary text-primary-foreground hover:bg-primary"
                                    )}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
};
