'use client';
import {
    IconAlphabetGreek,
    IconBook,
    IconBrandOpenai,
    IconCode,
    IconCube,
    IconMessage,
    IconMicrophone,
    IconMovie,
    IconMusic,
    IconPhone,
    IconPhoto,
    IconVideo,
    IconChevronDown,
    IconAtom,
    IconNorthStar
} from '@tabler/icons-react';
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@repo/ui';
import { useState } from 'react';
import { cn } from '@repo/ui';

export enum GenerationMode {
    DEEP_RESEARCH = 'deep',
    PRO_SEARCH = 'pro',
    TEXT = 'text',
    IMAGE = 'image',
    VIDEO = 'video',
    AUDIO = 'audio',
    MUSIC = 'music',
    EBOOK = 'ebook',
    CODE = 'code',
    AGENT = 'agent',
    ASSET_3D = '3d_asset',
}

export const generationOptions = [
    {
        label: 'Deep Research',
        value: GenerationMode.DEEP_RESEARCH,
        icon: <IconAtom size={16} />,
        description: 'In depth research on complex topic'
    },
    {
        label: 'Pro Search',
        value: GenerationMode.PRO_SEARCH,
        icon: <IconNorthStar size={16} />,
        description: 'Pro search with web search'
    },
    {
        label: 'Text',
        value: GenerationMode.TEXT,
        icon: <IconMessage size={16} />,
        description: 'Generate text, stories, and answers'
    },
    {
        label: 'Image',
        value: GenerationMode.IMAGE,
        icon: <IconPhoto size={16} />,
        description: 'Create stunning AI art and photos'
    },
    {
        label: 'Video',
        value: GenerationMode.VIDEO,
        icon: <IconMovie size={16} />,
        description: 'Generate videos from text'
    },
    {
        label: 'Audio',
        value: GenerationMode.AUDIO,
        icon: <IconMicrophone size={16} />,
        description: 'Text to speech and sound effects'
    },
    {
        label: 'Music',
        value: GenerationMode.MUSIC,
        icon: <IconMusic size={16} />,
        description: 'Compose original music'
    },
    {
        label: 'Ebook',
        value: GenerationMode.EBOOK,
        icon: <IconBook size={16} />,
        description: 'Write entire books and guides'
    },
    {
        label: 'Code',
        value: GenerationMode.CODE,
        icon: <IconCode size={16} />,
        description: 'Generate software and scripts'
    },
    {
        label: 'Agent',
        value: GenerationMode.AGENT,
        icon: <IconBrandOpenai size={16} />,
        description: 'Autonomous AI agents'
    },
    {
        label: '3D Asset',
        value: GenerationMode.ASSET_3D,
        icon: <IconCube size={16} />,
        description: 'Generate 3D models and assets'
    },
];

export const GenerationSelector = () => {
    const [mode, setMode] = useState<GenerationMode>(GenerationMode.TEXT);
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = generationOptions.find(opt => opt.value === mode) || generationOptions[0];

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant={'secondary'} size="xs" className="h-8 rounded-lg bg-muted/40 border-0 hover:bg-muted/60 transition-colors gap-2">
                    <span className="text-muted-foreground">{selectedOption.icon}</span>
                    <span className="font-semibold text-[11px] uppercase tracking-wider">{selectedOption.label}</span>
                    <IconChevronDown size={12} strokeWidth={2} className="opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="bottom" className="w-[240px]">
                <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
                    Generation Mode
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    {generationOptions.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            onSelect={() => setMode(option.value)}
                            className={cn(
                                "gap-2.5 px-2 py-2 cursor-pointer",
                                mode === option.value && "bg-muted font-medium"
                            )}
                        >
                            <span className={cn(
                                "flex items-center justify-center w-5 h-5",
                                mode === option.value ? "text-primary" : "text-muted-foreground"
                            )}>
                                {option.icon}
                            </span>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-sm">{option.label}</span>
                                <span className="text-[10px] text-muted-foreground leading-tight">
                                    {option.description}
                                </span>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
