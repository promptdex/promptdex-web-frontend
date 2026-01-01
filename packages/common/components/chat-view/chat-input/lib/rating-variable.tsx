import { NodeViewWrapper } from '@tiptap/react';
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
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <div className="flex items-center gap-3 h-9 px-3 rounded-lg bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] min-w-[140px] group">
                <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 shrink-0 select-none">
                    {label}
                </div>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: max }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => onChange(String(i + 1))}
                            className="transition-transform hover:scale-125 focus:outline-none p-0.5"
                        >
                            {i < rating ? (
                                <IconStarFilled size={14} className="text-yellow-400" />
                            ) : (
                                <IconStar size={14} className="text-muted-foreground/30 hover:text-yellow-400/50" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </NodeViewWrapper>
    );
};
