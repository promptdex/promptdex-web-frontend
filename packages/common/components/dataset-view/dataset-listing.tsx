'use client';
import { MOCK_DATASETS } from '@repo/common/lib';
import { DirectoryCard, DirectoryGrid, DirectorySearch } from '@repo/common/components';
import Link from 'next/link';
import { useState } from 'react';


export const DatasetListing = ({
    onSelect
}: {
    onSelect?: (dataset: any) => void;
}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <div className="flex flex-col gap-12 w-full max-w-7xl mx-auto px-6 py-12">
            {!onSelect && (
                <div className="flex flex-col gap-4 items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent">
                        Dataset Library
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Explore and manage your specialized datasets for grounded AI responses.
                    </p>
                    <DirectorySearch value={search} onChange={setSearch} placeholder="Search datasets..." />
                </div>
            )}

            <DirectoryGrid>
                {MOCK_DATASETS.map((dataset) => (
                    <DirectoryCard
                        key={dataset.id}
                        title={dataset.name}
                        description={dataset.description}
                        href={onSelect ? undefined : `/dataset/${dataset.id}`}
                        onClick={onSelect ? () => onSelect(dataset) : undefined}
                    />
                ))}
            </DirectoryGrid>
        </div>
    );
};
