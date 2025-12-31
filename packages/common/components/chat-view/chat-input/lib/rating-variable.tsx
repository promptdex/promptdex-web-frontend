import { NodeViewWrapper } from '@tiptap/react';
import { cn } from '@repo/ui';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

interface RatingVariableProps {
    label: string;
    value: string;
    max?: number;
    onChange: (value: string) => void;
}

export const RatingVariable: React.FC<RatingVariableProps> = ({ label, value, max = 5, onChange }) => {
    const rating = parseInt(value) || 0;

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="flex flex-col gap-2 px-5 py-3 rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] animate-in fade-in duration-500">
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 px-0.5">
                    {label}
                </div>
                <div className="flex gap-1">
                    {Array.from({ length: max }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => onChange(String(i + 1))}
                            className="transition-transform hover:scale-125 focus:outline-none"
                        >
                            {i < rating ? (
                                <IconStarFilled size={24} className="text-yellow-400" />
                            ) : (
                                <IconStar size={24} className="text-muted-foreground/30 hover:text-yellow-400/50" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </NodeViewWrapper>
    );
};
