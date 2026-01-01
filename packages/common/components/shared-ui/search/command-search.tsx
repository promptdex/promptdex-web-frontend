'use client';
import { useRootContext } from '@repo/common/context';
import { MOCK_CATEGORIES, MOCK_DATASETS } from '@repo/common/lib';
import { useAppStore, useChatStore } from '@repo/common/store';
import {
    cn,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Kbd,
} from '@repo/ui';
import {
    IconCommand,
    IconKey,
    IconMessageCircleFilled,
    IconPlus,
    IconTemplate,
    IconDatabase,
    IconTrash,
} from '@tabler/icons-react';
import moment from 'moment';
import { useTheme } from 'next-themes';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const CommandSearch = () => {
    const { threadId: currentThreadId } = useParams();
    const { isCommandSearchOpen, setIsCommandSearchOpen } = useRootContext();
    const threads = useChatStore(state => state.threads);
    const getThread = useChatStore(state => state.getThread);
    const removeThread = useChatStore(state => state.deleteThread);
    const switchThread = useChatStore(state => state.switchThread);
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const clearThreads = useChatStore(state => state.clearAllThreads);
    const setIsSettingsOpen = useAppStore(state => state.setIsSettingsOpen);
    const setSettingTab = useAppStore(state => state.setSettingTab);
    const [search, setSearch] = useState('');

    // Flatten templates for search
    const allTemplates = MOCK_CATEGORIES.flatMap(cat => cat.templates.map(t => ({ ...t, categoryName: cat.name, categoryIcon: cat.icon })));

    const groupedThreads: Record<string, typeof threads> = {
        today: [],
        yesterday: [],
        last7Days: [],
        last30Days: [],
        previousMonths: [],
    };

    const groupsNames = {
        today: 'Today',
        yesterday: 'Yesterday',
        last7Days: 'Last 7 Days',
        last30Days: 'Last 30 Days',
        previousMonths: 'Previous Months',
    };

    // Filter threads based on search
    const filteredThreads = threads.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

    filteredThreads.forEach(thread => {
        const createdAt = moment(thread.createdAt);
        const now = moment();
        if (createdAt.isSame(now, 'day')) {
            groupedThreads.today.push(thread);
        } else if (createdAt.isSame(now.clone().subtract(1, 'day'), 'day')) {
            groupedThreads.yesterday.push(thread);
        } else if (createdAt.isAfter(now.clone().subtract(7, 'days'))) {
            groupedThreads.last7Days.push(thread);
        } else if (createdAt.isAfter(now.clone().subtract(30, 'days'))) {
            groupedThreads.last30Days.push(thread);
        } else {
            groupedThreads.previousMonths.push(thread);
        }
    });

    // Filter datasets and templates
    const filteredDatasets = MOCK_DATASETS.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.description.toLowerCase().includes(search.toLowerCase()));
    const filteredTemplates = allTemplates.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()));


    useEffect(() => {
        router.prefetch('/chat');
    }, [isCommandSearchOpen, threads, router]);

    const onClose = () => {
        setIsCommandSearchOpen(false);
        setSearch('');
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsCommandSearchOpen(true);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const actions = [
        {
            name: 'New Thread',
            icon: IconPlus,
            action: () => {
                router.push('/chat');
                onClose();
            },
        },
        {
            name: 'Delete Thread',
            icon: IconTrash,
            action: async () => {
                const thread = await getThread(currentThreadId as string);
                if (thread) {
                    removeThread(thread.id);
                    router.push('/chat');
                    onClose();
                }
            },
        },
        {
            name: 'Use your own API key',
            icon: IconKey,
            action: () => {
                setIsSettingsOpen(true);
                setSettingTab('api-keys');
                onClose();
            },
        },
        {
            name: 'Remove All Threads',
            icon: IconTrash,
            action: () => {
                clearThreads();
                router.push('/chat');
                onClose();
            },
        },
    ];

    return (
        <CommandDialog open={isCommandSearchOpen} onOpenChange={setIsCommandSearchOpen}>
            <div className="flex w-full flex-row items-center gap-2 p-0.5">
                <CommandInput
                    placeholder="Search threads, templates, datasets..."
                    className="w-full"
                    value={search}
                    onValueChange={setSearch}
                />
                <div className="flex shrink-0 items-center gap-1 px-2">
                    <Kbd className="h-5 w-5">
                        <IconCommand size={12} strokeWidth={2} className="shrink-0" />
                    </Kbd>
                    <Kbd className="h-5 w-5">K</Kbd>
                </div>
            </div>
            <div className="w-full">
                <div className="border-border h-[1px] w-full border-b" />
            </div>
            <CommandList className="max-h-[420px] overflow-y-auto p-0.5 pt-1.5">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Actions">
                    {actions.map(action => (
                        <CommandItem
                            key={action.name}
                            className="gap-2"
                            value={action.name}
                            onSelect={action.action}
                        >
                            <action.icon
                                size={14}
                                strokeWidth="2"
                                className="text-muted-foreground flex-shrink-0"
                            />
                            {action.name}
                        </CommandItem>
                    ))}
                </CommandGroup>

                {filteredTemplates.length > 0 && (
                    <CommandGroup heading="Templates">
                        {filteredTemplates.map(template => (
                            <CommandItem
                                key={template.id}
                                value={`template-${template.id}-${template.title}`}
                                className="gap-2"
                                onSelect={() => {
                                    router.push(`/template/${template.id}`);
                                    onClose();
                                }}
                            >
                                <IconTemplate size={14} strokeWidth={2} className="text-muted-foreground flex-shrink-0" />
                                <div className="flex flex-col gap-0.5 overflow-hidden">
                                    <span className="truncate">{template.title}</span>
                                    <span className="text-[10px] text-muted-foreground truncate">{template.description}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {filteredDatasets.length > 0 && (
                    <CommandGroup heading="Datasets">
                        {filteredDatasets.map(dataset => (
                            <CommandItem
                                key={dataset.id}
                                value={`dataset-${dataset.id}-${dataset.name}`}
                                className="gap-2"
                                onSelect={() => {
                                    router.push(`/dataset/${dataset.id}`);
                                    onClose();
                                }}
                            >
                                <IconDatabase size={14} strokeWidth={2} className="text-muted-foreground flex-shrink-0" />
                                <div className="flex flex-col gap-0.5 overflow-hidden">
                                    <span className="truncate">{dataset.name}</span>
                                    <span className="text-[10px] text-muted-foreground truncate">{dataset.description}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}

                {Object.entries(groupedThreads).map(
                    ([key, threads]) =>
                        threads.length > 0 && (
                            <CommandGroup
                                key={key}
                                heading={groupsNames[key as keyof typeof groupsNames]}
                            >
                                {threads.map(thread => (
                                    <CommandItem
                                        key={thread.id}
                                        value={`${thread.id}/${thread.title}`}
                                        className={cn('w-full gap-3')}
                                        onSelect={() => {
                                            switchThread(thread.id);
                                            router.push(`/chat/${thread.id}`);
                                            onClose();
                                        }}
                                    >
                                        <IconMessageCircleFilled
                                            size={16}
                                            strokeWidth={2}
                                            className="text-muted-foreground/50"
                                        />
                                        <span className="w-full truncate font-normal">
                                            {thread.title}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )
                )}
            </CommandList>
        </CommandDialog>
    );
};
