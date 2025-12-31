'use client';

import { DatasetListing } from '@repo/common/components';
import { FeatureGate } from '@repo/common/components';
import { FeatureName } from '@repo/common/lib';

const DatasetsPage = () => {
    return (
        <FeatureGate feature={FeatureName.Dataset} action="access" subject={FeatureName.Dataset} fallback={<div className="p-8 text-center">Feature Disabled or Access Denied</div>}>
            <div className="flex h-full w-full flex-col">
                <DatasetListing />
            </div>
        </FeatureGate>
    );
};

export default DatasetsPage;
