'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@repo/ui';
import { TemplateListing } from '../../template-view';

interface TemplateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (template: any) => void;
}

export const TemplateDialog = ({ open, onOpenChange, onSelect }: TemplateDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent ariaTitle="Template Library" className="max-w-5xl h-[80vh] flex flex-col p-0 overflow-hidden border-none bg-transparent shadow-none w-full">
                <div className="flex-1 overflow-y-auto no-scrollbar rounded-3xl bg-background/80 backdrop-blur-3xl border border-white/10 p-6 shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold">Template Library</DialogTitle>
                        <DialogDescription>
                            Select a template to insert into your chat.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex-1">
                        <TemplateListing onSelect={onSelect} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
