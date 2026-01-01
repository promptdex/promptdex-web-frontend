import { Category, Template } from '@repo/common/lib';
import { cn } from '@repo/ui';
import { IconChevronRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface TemplateCardProps {
    template: Template & { category: Category };
    onClick: () => void;
    index?: number;
}

export const TemplateCard = ({ template, onClick, index = 0 }: TemplateCardProps) => {
    return (
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            onClick={onClick}
            className={cn(
                "group relative p-5 rounded-2xl text-left transition-all duration-300",
                "bg-zinc-500/5 hover:bg-zinc-500/10 dark:bg-zinc-500/5 dark:hover:bg-zinc-500/10",
                "border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700",
                "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-500/5",
                "w-full overflow-hidden"
            )}
        >
            <div className="flex items-start gap-4">
                <div className={cn(
                    "shrink-0 p-3 rounded-xl transition-colors duration-300",
                    template.category.color,
                    "bg-zinc-100 dark:bg-zinc-900 group-hover:bg-opacity-80"
                )}>
                    <template.category.icon size={22} className="opacity-90" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors text-base">
                        {template.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                        {template.description}
                    </p>
                </div>
                <IconChevronRight
                    size={16}
                    className="shrink-0 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100"
                />
            </div>
            {/* Glossy gradiant overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.button>
    );
};
