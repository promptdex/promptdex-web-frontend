import { Input } from '@repo/ui';
import { IconSearch } from '@tabler/icons-react';

interface DirectorySearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const DirectorySearch = ({ value, onChange, placeholder = "Search..." }: DirectorySearchProps) => {
    return (
        <div className="relative w-full max-w-md group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                <IconSearch size={20} strokeWidth={2} />
            </div>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="h-14 w-full rounded-full border-white/10 dark:border-white/5 bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md px-12 text-lg transition-all focus-visible:ring-primary/20 focus-visible:border-primary/40 placeholder:text-muted-foreground/30"
            />
        </div>
    );
};
