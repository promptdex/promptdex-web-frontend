import Link from 'next/link';
import { cn, Button } from '@repo/ui';
import { useAppStore } from '@repo/common/store';

interface SidebarLinkProps {
    href: string;
    icon: any; // Using any for icon type flexibility (Lucide or Tabler)
    label: string;
    active?: boolean;
}

export const SidebarLink = ({ href, icon: Icon, label, active }: SidebarLinkProps) => {
    const isSidebarOpen = useAppStore(state => state.isSidebarOpen);

    return (
        <Link href={href} className={isSidebarOpen ? 'w-full' : ''}>
            <Button
                size={isSidebarOpen ? 'sm' : 'icon-sm'}
                variant={active ? 'secondary' : 'ghost'}
                rounded="lg"
                tooltip={isSidebarOpen ? undefined : label}
                tooltipSide="right"
                className={cn(
                    isSidebarOpen && 'relative w-full justify-start px-2',
                    !isSidebarOpen && 'justify-center',
                    active && 'bg-brand/10 text-brand font-semibold'
                )}
            >
                <Icon size={18} strokeWidth={2} className={cn(isSidebarOpen && 'mr-2')} />
                {isSidebarOpen && <span className="text-sm font-medium">{label}</span>}
            </Button>
        </Link>
    );
};
