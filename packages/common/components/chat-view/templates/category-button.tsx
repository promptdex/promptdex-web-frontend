import { Category } from '@repo/common/lib';
import { cn } from '@repo/ui';
import { motion } from 'framer-motion';

interface CategoryButtonProps {
    category: Category;
    onClick: () => void;
    index?: number;
}

export const CategoryButton = ({ category, onClick, index = 0 }: CategoryButtonProps) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={onClick}
            className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl transition-all w-full",
                "bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/15",
                category.color
            )}
        >
            <category.icon size={24} />
            <span className="text-sm font-medium text-foreground">{category.name}</span>
        </motion.button>
    );
};
