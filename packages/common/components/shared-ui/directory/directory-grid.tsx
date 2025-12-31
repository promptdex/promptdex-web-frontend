import { cn } from '@repo/ui';
import { motion } from 'framer-motion';

interface DirectoryGridProps {
    children: React.ReactNode;
    className?: string;
}

export const DirectoryGrid = ({ children, className }: DirectoryGridProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
