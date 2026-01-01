import { useChatStore } from '@repo/common/store';
import { ChatModeConfig } from '@repo/shared/config';
import {
    Button,
    Tooltip,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@repo/ui';
import {
    IconBrandDropbox,
    IconBrandGoogleDrive,
    IconBrandOnedrive,
    IconLink,
    IconPaperclip,
    IconUpload,
} from '@tabler/icons-react';
import { useState, useRef, FC } from 'react';

export type TImageUpload = {
    id: string;
    label: string;
    tooltip: string;
    showIcon: boolean;
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleFile: (file: File) => void;
};

export const ImageUpload: FC<TImageUpload> = ({
    id,
    label,
    tooltip,
    showIcon,
    handleImageUpload,
    handleFile,
}) => {
    const chatMode = useChatStore(state => state.chatMode);
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!ChatModeConfig[chatMode]?.imageUpload) {
        return null;
    }

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleImageUpload(e);
        setIsOpen(false);
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={onFileSelect}
            />
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <Tooltip content={tooltip}>
                    <DropdownMenuTrigger asChild>
                        {showIcon ? (
                            <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <IconPaperclip size={18} strokeWidth={2} />
                            </Button>
                        ) : (
                            <Button variant="bordered">
                                {label}
                            </Button>
                        )}
                    </DropdownMenuTrigger>
                </Tooltip>
                <DropdownMenuContent align="center" side="top" className="w-[200px]">
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
                        Import Media
                    </DropdownMenuLabel>

                    <DropdownMenuItem onSelect={triggerUpload} className="gap-2 cursor-pointer">
                        <IconUpload size={16} /> <span>Upload</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                        <IconLink size={16} /> <span>From URL</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
                        Integrations
                    </DropdownMenuLabel>

                    <DropdownMenuItem className="gap-2 cursor-pointer">
                        <IconBrandGoogleDrive size={16} /> <span>Google Drive</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                        <IconBrandDropbox size={16} /> <span>Dropbox</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                        <IconBrandOnedrive size={16} /> <span>OneDrive</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
