'use client';

import * as React from 'react';
import { IconCheck, IconChevronDown, IconLoader2, IconSearch } from '@tabler/icons-react';

import { cn } from '../lib/utils';
import { Button } from './button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

// Generic item type - can be extended
export interface ComboboxItem {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
    // Allow extra properties
    [key: string]: any;
}

// User requested specific types
export interface ComboboxTemplate extends ComboboxItem {
    category?: string;
    tags?: string[];
}

export interface ComboboxDataset extends ComboboxItem {
    size?: string;
    fileCount?: number;
}

export interface ComboboxProps<T extends ComboboxItem = ComboboxItem> {
    items: T[];
    value?: string;
    onValueChange: (value: string, item?: T) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
    className?: string;
    // Search props
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    // Pagination props
    isLoading?: boolean;
    hasMore?: boolean;
    onLoadMore?: () => void;
}

export function Combobox<T extends ComboboxItem = ComboboxItem>({
    items,
    value,
    onValueChange,
    placeholder = 'Select item...',
    searchPlaceholder = 'Search...',
    emptyText = 'No items found.',
    disabled = false,
    className,
    searchValue,
    onSearchChange,
    isLoading = false,
    hasMore = false,
    onLoadMore,
}: ComboboxProps<T>) {
    const [open, setOpen] = React.useState(false);
    // If searchValue/onSearchChange are not provided, we rely on internal state (which cmdk handles mostly, but we might want to expose internal search state)
    // For this advanced component, we assume controlled search if onSearchChange is passed, or standard filtering if not.
    // However, cmdk's CommandInput handles internal state well. If onSearchChange is passed, we hook into it.

    const [internalSearch, setInternalSearch] = React.useState('');
    const effectiveSearch = searchValue ?? internalSearch;
    const handleSearchChange = (val: string) => {
        setInternalSearch(val);
        onSearchChange?.(val);
    };

    const selectedItem = items.find((item) => item.value === value);

    // Handle scroll for pagination
    const listRef = React.useRef<HTMLDivElement>(null);
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            // Near bottom
            if (!isLoading && hasMore && onLoadMore) {
                onLoadMore();
            }
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outlined"
                    role="combobox"
                    aria-expanded={open}
                    className={cn('w-full justify-between', className)}
                    disabled={disabled}
                >
                    {selectedItem ? (
                        <div className="flex flex-col items-start gap-0.5 text-left truncate">
                            <span className="truncate">{selectedItem.label}</span>
                            {selectedItem.description && (
                                <span className="text-[10px] text-muted-foreground truncate font-normal">
                                    {selectedItem.description}
                                </span>
                            )}
                        </div>
                    ) : (
                        <span className="text-muted-foreground">{placeholder}</span>
                    )}
                    <IconChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                <Command shouldFilter={!onSearchChange}>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        value={effectiveSearch}
                        onValueChange={handleSearchChange}
                    />
                    <CommandList
                        onScroll={handleScroll}
                        className="max-h-[300px] overflow-y-auto"
                    >
                        <CommandEmpty>
                            {isLoading ? (
                                <div className="flex items-center justify-center py-6 text-sm text-muted-foreground gap-2">
                                    <IconLoader2 className="animate-spin h-4 w-4" />
                                    Loading...
                                </div>
                            ) : (
                                emptyText
                            )}
                        </CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value} // cmdk uses value for filtering
                                    keywords={[item.label, ...(item.description ? [item.description] : [])]}
                                    onSelect={(currentValue) => {
                                        // internal value might differ from item.value due to cmdk normalization
                                        // so we find the item.
                                        // Actually simplest is just to pass item.value back
                                        onValueChange(item.value === value ? '' : item.value, item);
                                        setOpen(false);
                                    }}
                                >
                                    <IconCheck
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === item.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    <div className="flex flex-col gap-0.5">
                                        <span>{item.label}</span>
                                        {item.description && (
                                            <span className="text-xs text-muted-foreground font-light">
                                                {item.description}
                                            </span>
                                        )}
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        {hasMore && (
                            <div className="p-2 text-center">
                                {isLoading ? (
                                    <IconLoader2 className="animate-spin h-4 w-4 mx-auto text-muted-foreground" />
                                ) : (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full text-xs h-8 text-muted-foreground"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLoadMore?.();
                                        }}
                                    >
                                        Load more
                                    </Button>
                                )}
                            </div>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
