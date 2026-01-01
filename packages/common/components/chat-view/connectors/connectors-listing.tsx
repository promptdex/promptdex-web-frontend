'use client';
import { MOCK_CONNECTORS } from '@repo/common/lib';
import { DirectoryCard, DirectoryGrid, DirectorySearch } from '@repo/common/components';
import { useState } from 'react';

export const ConnectorsListing = ({
    onSelect
}: {
    onSelect?: (connector: any) => void;
}) => {
    const [search, setSearch] = useState<string>("");

    const filteredConnectors = MOCK_CONNECTORS.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <div className="flex flex-col gap-4 items-center text-center px-4">
                <DirectorySearch value={search} onChange={setSearch} placeholder="Search connectors..." />
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 px-1">
                <DirectoryGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                    {filteredConnectors.map((connector) => (
                        <DirectoryCard
                            key={connector.id}
                            title={connector.name}
                            description={
                                <div className="flex flex-col gap-1">
                                    <span>{connector.description}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        {connector.downloads && (
                                            <span className="text-xs text-muted-foreground">{connector.downloads} downloads</span>
                                        )}
                                        <span className="bg-muted px-1.5 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">{connector.type}</span>
                                    </div>
                                </div>
                            }
                            onClick={onSelect ? () => onSelect(connector) : undefined}
                        />
                    ))}
                </DirectoryGrid>
            </div>
        </div>
    );
};
