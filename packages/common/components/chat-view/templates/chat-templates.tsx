'use client';

import {
    Button,
    cn
} from '@repo/ui';
import { IconTemplate, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { TemplateDialog } from '../../shared-ui/dialogs';
import { useChatStore } from '@repo/common/store';
import { insertTemplateIntoEditor } from '@repo/common/lib';

export const ChatTemplates = () => {
    const [isOpen, setIsOpen] = useState(false);
    const editor = useChatStore(state => state.editor);
    const activeTemplate = useChatStore(state => state.activeTemplate);
    const setActiveTemplate = useChatStore(state => state.setActiveTemplate);

    const handleSelect = (template: any) => {
        if (!editor) return;

        setActiveTemplate(template);

        // Use shared helper to insert template with markdown support
        insertTemplateIntoEditor(editor, template);

        setIsOpen(false);
    };

    return (
        <>
            <Button
                size={activeTemplate ? "sm" : "icon-sm"}
                tooltip={activeTemplate ? "Change Template" : "Browse Templates"}
                variant={activeTemplate ? "secondary" : "ghost"}
                onClick={() => setIsOpen(true)}
                className={cn(
                    "transition-all duration-200",
                    activeTemplate ? "h-8 px-2 pl-2.5 gap-2" : "h-8 w-8 text-muted-foreground hover:text-foreground"
                )}
            >
                {activeTemplate ? (
                    <>
                        <IconTemplate size={14} strokeWidth={2.5} className="flex-shrink-0" />
                        <span className="text-xs font-semibold max-w-[100px] truncate">
                            {activeTemplate.title}
                        </span>
                        <div
                            role="button"
                            tabIndex={0}
                            className="flex items-center justify-center rounded-md hover:bg-black/10 dark:hover:bg-white/20 p-0.5 -mr-1 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveTemplate(null);
                                editor?.commands.clearContent();
                            }}
                        >
                            <IconX size={12} strokeWidth={2.5} />
                        </div>
                    </>
                ) : (
                    <IconTemplate size={18} strokeWidth={2} />
                )}
            </Button>
            <TemplateDialog open={isOpen} onOpenChange={setIsOpen} onSelect={handleSelect} />
        </>
    );
};
