import { NodeViewWrapper } from '@tiptap/react';
import { cn, Input } from '@repo/ui';
import { IconPhone } from '@tabler/icons-react';

interface PhoneVariableProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export const PhoneVariable: React.FC<PhoneVariableProps> = ({ label, value, onChange }) => {
    const formatPhone = (input: string) => {
        const digits = input.replace(/\D/g, '');
        if (digits.length <= 2) return digits;
        if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        onChange(formatted);
    };

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] focus-within:bg-white/[0.05] focus-within:border-primary/20 min-w-[180px] group">
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                    <IconPhone size={12} className="opacity-70" />
                    <span>{label}</span>
                </div>
                <Input
                    type="tel"
                    value={value}
                    onChange={handleChange}
                    placeholder="(00)..."
                    className="h-full border-0 bg-transparent p-0 focus-visible:ring-0 shadow-none text-sm font-medium placeholder:text-muted-foreground/20 w-full"
                    onKeyDown={(e) => e.stopPropagation()}
                />
            </div>
        </NodeViewWrapper>
    );
};
