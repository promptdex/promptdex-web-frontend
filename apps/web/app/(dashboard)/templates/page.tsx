'use client';

import { TemplateListing } from '@repo/common/components';
import { FeatureGate } from '@repo/common/components';
import { FeatureName } from '@repo/common/lib';

const TemplatesPage = () => {
    return (
        <FeatureGate feature={FeatureName.Template} action="access" subject={FeatureName.Template} fallback={<div className="p-8 text-center">Feature Disabled or Access Denied</div>}>
            <div className="flex h-full w-full flex-col">
                <TemplateListing />
            </div>
        </FeatureGate>
    );
};

export default TemplatesPage;
