'use client';

import { NodeViewWrapper } from '@tiptap/react';
import { useState, useMemo } from 'react';
import { cn, Input, Button, Badge } from '@repo/ui';
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
        <NodeViewWrapper as="span" className="inline-block mx-1 align-middle relative my-2">
            <div className="relative">
                <Button
                    variant="outlined"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "h-14 min-w-[280px] justify-between px-5 text-sm font-semibold rounded-[20px] bg-white/[0.03] dark:bg-black/[0.1] border-white/10 dark:border-white/5 hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-md group animate-in fade-in duration-500",
                        !value && "text-muted-foreground"
                    )}
                >
                    <div className="flex flex-col items-start gap-1 text-left">
                        <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 font-black px-0.5">
                            {label} {dataset && <span className="opacity-60">({dataset.name})</span>}
                        </span>
                        <span className="truncate max-w-[200px] text-base group-hover:text-foreground transition-colors">
                            {value || `Select from ${dataset?.name || 'dataset'}...`}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {filterGroup.conditions.length > 0 && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 bg-primary/20 text-primary">
                                {filterGroup.conditions.length} filter{filterGroup.conditions.length > 1 ? 's' : ''}
                            </Badge>
                        )}
                        <IconChevronDown className={cn("h-4 w-4 opacity-40 transition-all", isOpen && "rotate-180")} />
                    </div>
                </Button>

                {isOpen && (
                    <div className="absolute top-full left-0 mt-2 w-[400px] overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-background/95 backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Search & Filter Toggle */}
                        <div className="p-2 border-b border-white/5 flex gap-2">
                            <div className="relative flex-1">
                                <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="pl-9 h-9 bg-white/5 border-0"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <Button
                                variant={showFilters ? "default" : "ghost"}
                                size="icon-sm"
                                onClick={() => setShowFilters(!showFilters)}
                                className="shrink-0"
                            >
                                <IconFilter size={16} />
                            </Button>
                        </div>

                        {/* Filter Panel */}
                        {showFilters && (
                            <div className="p-3 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                                        Filters
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={toggleLogic}
                                            className={cn(
                                                "text-[10px] font-bold px-2 py-1 rounded-lg transition-colors",
                                                filterGroup.logic === 'and'
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : "bg-orange-500/20 text-orange-400"
                                            )}
                                        >
                                            {filterGroup.logic.toUpperCase()}
                                        </button>
                                        <Button size="icon-sm" variant="ghost" onClick={addCondition}>
                                            <IconPlus size={14} />
                                        </Button>
                                    </div>
                                </div>

                                {filterGroup.conditions.length === 0 ? (
                                    <div className="text-center py-4 text-muted-foreground/40 text-xs">
                                        No filters. Click + to add one.
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {filterGroup.conditions.map((condition, idx) => (
                                            <div key={idx} className="flex items-center gap-2">
                                                <select
                                                    value={condition.operator}
                                                    onChange={(e) => updateCondition(idx, { operator: e.target.value as any })}
                                                    className="h-8 px-2 rounded-lg bg-white/5 border-0 text-xs font-medium focus:ring-1 focus:ring-primary/30"
                                                >
                                                    <option value="contains">Contains</option>
                                                    <option value="equals">Equals</option>
                                                    <option value="startsWith">Starts with</option>
                                                    <option value="endsWith">Ends with</option>
                                                    <option value="not">NOT Contains</option>
                                                </select>
                                                <Input
                                                    value={condition.value}
                                                    onChange={(e) => updateCondition(idx, { value: e.target.value })}
                                                    placeholder="Value..."
                                                    className="h-8 flex-1 bg-white/5 border-0 text-xs"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <Button
                                                    size="icon-sm"
                                                    variant="ghost"
                                                    onClick={() => removeCondition(idx)}
                                                    className="shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                >
                                                    <IconX size={14} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Results */}
                        <div className="max-h-[220px] overflow-y-auto p-1.5">
                            <div className="text-[9px] text-muted-foreground/40 px-2 py-1 mb-1">
                                {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
                            </div>
                            {filteredItems.length === 0 ? (
                                <div className="text-center py-6 text-muted-foreground text-sm">
                                    {dataset ? 'No items match filters' : 'Dataset not found'}
                                </div>
                            ) : (
                                filteredItems.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            onSelect(item);
                                            setIsOpen(false);
                                            setSearch('');
                                        }}
                                        className={cn(
                                            "w-full text-left px-3 py-2 rounded-xl text-sm transition-all hover:bg-primary/10 hover:text-primary",
                                            value === item && "bg-primary/10 text-primary font-bold"
                                        )}
                                    >
                                        {item}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
};
