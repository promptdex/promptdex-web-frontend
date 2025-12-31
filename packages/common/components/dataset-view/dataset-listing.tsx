'use client';
import { DirectoryCard, DirectoryGrid, DirectorySearch } from '../shared-ui/directory';
import { useState } from 'react';

const mockDatasets = [
    { title: "Legal Documents 2024", description: "Comprehensive collection of Brazilian civil law documents and precedents.", slug: "legal-docs-2024" },
    { title: "Financial Reports Q3", description: "Consolidated quarterly reports from top S&P 500 companies.", slug: "financial-reports-q3" },
    { title: "Academic Papers: AI", description: "State-of-the-art research papers in deep learning and NLP.", slug: "academic-papers-ai" },
];

export const DatasetListing = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col gap-12 w-full max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col gap-4 items-center text-center">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/40 bg-clip-text text-transparent">
                    Dataset Library
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                    Explore and manage your specialized datasets for grounded AI responses.
                </p>
                <DirectorySearch value={search} onChange={setSearch} placeholder="Search datasets..." />
            </div>

            <DirectoryGrid>
                {mockDatasets.map((dataset) => (
                    <DirectoryCard
                        key={dataset.slug}
                        title={dataset.title}
                        description={dataset.description}
                        href={`/dataset/${dataset.slug}`}
                    />
                ))}
            </DirectoryGrid>
        </div>
    );
};
