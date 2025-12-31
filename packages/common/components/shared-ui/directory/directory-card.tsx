import { cn } from '@repo/ui';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface DirectoryCardProps {
    title: string;
    description?: string;
    image?: string;
    href: string;
    className?: string;
    children?: React.ReactNode;
}

export const DirectoryCard = ({ title, description, image, href, className, children }: DirectoryCardProps) => {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                    "group relative flex flex-col gap-4 p-5 rounded-[32px] bg-white/[0.03] dark:bg-black/[0.1] backdrop-blur-md border border-white/10 dark:border-white/5 transition-all hover:bg-white/[0.05] hover:border-primary/20 cursor-pointer overflow-hidden h-full",
                    className
                )}
            >
                {image && (
                    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-muted/20 relative">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">{title}</h3>
                    {description && (
                        <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
                {children}
            </motion.div>
        </Link>
    );
};
