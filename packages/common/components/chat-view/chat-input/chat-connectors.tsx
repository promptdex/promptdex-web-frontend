'use client';

import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@repo/ui';
import { IconPlug, IconPlugConnected } from '@tabler/icons-react';
import { useState } from 'react';
import { MOCK_CONNECTORS } from '@repo/common/lib';
import { ConnectorsDialog } from '../../shared-ui/dialogs/connectors-dialog';

export const ChatConnectors = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Simulate some "active" connectors for the dropdown preview
    // In a real app, this would come from a store like useConnectorsStore
    const activeConnectors = MOCK_CONNECTORS.slice(0, 5);

    const handleSelect = (connector: any) => {
        // Handle selection (toggle connection, etc.)
        console.log('Selected connector:', connector);
        setIsDialogOpen(false);
    };

    return (
        <>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        size="icon-sm"
                        tooltip="Connectors"
                        variant="ghost"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                        <IconPlug size={18} strokeWidth={2} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-[240px]">
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
                        Active Connectors
                    </DropdownMenuLabel>

                    {activeConnectors.map(connector => (
                        <DropdownMenuItem key={connector.id} className="gap-2 cursor-pointer">
                            <IconPlugConnected size={14} className="text-green-500" />
                            <span className="truncate">{connector.name}</span>
                        </DropdownMenuItem>
                    ))}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onSelect={() => setIsDialogOpen(true)}
                        className="gap-2 cursor-pointer font-medium text-primary"
                    >
                        <IconPlug size={16} />
                        <span>Manage Connectors...</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ConnectorsDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                onSelect={handleSelect}
            />
        </>
    );
};
