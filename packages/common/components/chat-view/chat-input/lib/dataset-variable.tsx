'use client';

import { NodeViewWrapper } from '@tiptap/react';
import { useState, useMemo } from 'react';
import { cn, Input, Button, Badge, Popover, PopoverContent, PopoverTrigger } from '@repo/ui';
import { IconChevronDown, IconSearch, IconFilter, IconX, IconPlus } from '@tabler/icons-react';
import { MOCK_DATASETS, type Dataset } from '@repo/common/lib';

interface FilterCondition {
    field: string;
    operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'not';
    value: string;
}

interface FilterGroup {
    logic: 'and' | 'or';
    conditions: FilterCondition[];
}

interface DatasetVariableProps {
    label: string;
    value: string;
    datasetId?: string;
    onSelect: (value: string) => void;
}

export const DatasetVariable: React.FC<DatasetVariableProps> = ({
    label,
    value,
    datasetId,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState('');
    const [filterGroup, setFilterGroup] = useState<FilterGroup>({
        logic: 'and',
        conditions: [],
    });

    // Find dataset from mock datasets
    const dataset = useMemo((): Dataset | undefined => {
        return MOCK_DATASETS.find((d) => d.id === datasetId);
    }, [datasetId]);

    // Apply filters and search
    const filteredItems = useMemo((): string[] => {
        if (!dataset || !dataset.items) return [];

        let items = [...dataset.items];

        // Apply search
        if (search) {
            items = items.filter(item =>
                item.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Apply filter conditions
        if (filterGroup.conditions.length > 0) {
            items = items.filter(item => {
                const results = filterGroup.conditions.map(cond => {
                    const itemLower = item.toLowerCase();
                    const valueLower = cond.value.toLowerCase();

                    switch (cond.operator) {
                        case 'contains': return itemLower.includes(valueLower);
                        case 'equals': return itemLower === valueLower;
                        case 'startsWith': return itemLower.startsWith(valueLower);
                        case 'endsWith': return itemLower.endsWith(valueLower);
                        case 'not': return !itemLower.includes(valueLower);
                        default: return true;
                    }
                });

                return filterGroup.logic === 'and'
                    ? results.every(Boolean)
                    : results.some(Boolean);
            });
        }

        return items.slice(0, 50);
    }, [dataset, search, filterGroup]);

    const addCondition = () => {
        setFilterGroup(prev => ({
            ...prev,
            conditions: [...prev.conditions, { field: 'name', operator: 'contains', value: '' }],
        }));
    };

    const updateCondition = (index: number, updates: Partial<FilterCondition>) => {
        setFilterGroup(prev => ({
            ...prev,
            conditions: prev.conditions.map((c, i) => i === index ? { ...c, ...updates } : c),
        }));
    };

    const removeCondition = (index: number) => {
        setFilterGroup(prev => ({
            ...prev,
            conditions: prev.conditions.filter((_, i) => i !== index),
        }));
    };

    const toggleLogic = () => {
        setFilterGroup(prev => ({
            ...prev,
            logic: prev.logic === 'and' ? 'or' : 'and',
        }));
    };

    return (
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-1">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outlined"
                        className={cn(
                            "h-9 min-w-[180px] justify-between px-3 text-xs font-medium rounded-lg bg-white/[0.03] dark:bg-black/[0.1] border-white/10 dark:border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-md group",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <div className="flex items-center gap-2 text-left overflow-hidden">
                            <span className="text-[9px] uppercase tracking-wider opacity-50 font-bold shrink-0">
                                {label}
                            </span>
                            {value ? (
                                <span className="truncate max-w-[120px] text-foreground transition-colors">
                                    {value}
                                </span>
                            ) : (
                                <span className="opacity-50 truncate max-w-[120px]">
                                    {dataset?.name || 'Select...'}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                            {filterGroup.conditions.length > 0 && (
                                <span className="flex h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" />
                            )}
                            <IconChevronDown className={cn("h-3 w-3 opacity-40 transition-all", isOpen && "rotate-180")} />
                        </div>
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-[320px] p-0 overflow-hidden rounded-xl bg-background/95 backdrop-blur-xl border border-white/10 shadow-2xl"
                    align="start"
                    sideOffset={8}
                >
                    {/* Search & Filter Toggle */}
                    <div className="p-2 border-b border-white/5 flex gap-2">
                        <div className="relative flex-1">
                            <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="pl-9 h-8 text-xs bg-muted/20 border-0 focus-visible:ring-1"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                        <Button
                            variant={showFilters ? "default" : "ghost"}
                            size="icon-sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className="shrink-0 h-8 w-8"
                        >
                            <IconFilter size={14} />
                        </Button>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <div className="p-3 border-b border-white/5 bg-muted/10">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                    Filters
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={toggleLogic}
                                        className={cn(
                                            "text-[10px] font-bold px-2 py-0.5 rounded transition-colors",
                                            filterGroup.logic === 'and'
                                                ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                                                : "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
                                        )}
                                    >
                                        {filterGroup.logic.toUpperCase()}
                                    </button>
                                    <Button size="icon-sm" variant="ghost" onClick={addCondition} className="h-6 w-6">
                                        <IconPlus size={12} />
                                    </Button>
                                </div>
                            </div>

                            {filterGroup.conditions.length === 0 ? (
                                <div className="text-center py-2 text-muted-foreground/40 text-[10px]">
                                    No filters applied
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {filterGroup.conditions.map((condition, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5">
                                            <select
                                                value={condition.operator}
                                                onChange={(e) => updateCondition(idx, { operator: e.target.value as any })}
                                                className="h-7 px-1.5 rounded-md bg-muted/20 border-0 text-[10px] font-medium focus:ring-1 focus:ring-primary/30 w-20"
                                            >
                                                <option value="contains">Contains</option>
                                                <option value="equals">Equals</option>
                                                <option value="startsWith">Starts</option>
                                                <option value="endsWith">Ends</option>
                                                <option value="not">Not</option>
                                            </select>
                                            <Input
                                                value={condition.value}
                                                onChange={(e) => updateCondition(idx, { value: e.target.value })}
                                                placeholder="Value..."
                                                className="h-7 flex-1 bg-muted/20 border-0 text-[10px] px-2"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <Button
                                                size="icon-sm"
                                                variant="ghost"
                                                onClick={() => removeCondition(idx)}
                                                className="shrink-0 h-7 w-7 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                            >
                                                <IconX size={12} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Results */}
                    <div className="max-h-[220px] overflow-y-auto p-1">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground/40 px-2 py-1.5 font-bold">
                            {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
                        </div>
                        {filteredItems.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground text-xs">
                                {dataset ? 'No matches found' : 'Dataset not available'}
                            </div>
                        ) : (
                            <div className="space-y-0.5">
                                {filteredItems.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            onSelect(item);
                                            setIsOpen(false);
                                            setSearch('');
                                        }}
                                        className={cn(
                                            "w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:bg-primary/5 hover:text-primary",
                                            value === item && "bg-primary/10 text-primary font-medium"
                                        )}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </NodeViewWrapper>
    );
};
