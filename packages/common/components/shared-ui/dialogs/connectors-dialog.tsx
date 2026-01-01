'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@repo/ui';
import { ConnectorsListing } from '../../chat-view/connectors/connectors-listing';

interface ConnectorsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (connector: any) => void;
}

export const ConnectorsDialog = ({ open, onOpenChange, onSelect }: ConnectorsDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent ariaTitle="Connectors Library" className="max-w-5xl h-[80vh] flex flex-col p-0 overflow-hidden border-none bg-transparent shadow-none w-full">
                <div className="flex-1 flex flex-col overflow-hidden rounded-3xl bg-background/95 backdrop-blur-3xl border border-white/10 p-6 shadow-2xl">
                    <DialogHeader className="mb-6 flex-shrink-0">
                        <DialogTitle className="text-2xl font-bold">Connectors Library</DialogTitle>
                        <DialogDescription>
                            Connect your favorite tools to unlock more capabilities.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 min-h-0">
                        <ConnectorsListing onSelect={onSelect} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
