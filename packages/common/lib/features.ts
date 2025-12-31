
export enum FeatureName {
    Dataset = 'dataset',
    Template = 'template',
}

export const getFeatureFlag = (name: FeatureName): boolean => {
    if (typeof process === 'undefined') return true;

    switch (name) {
        case FeatureName.Dataset:
            return process.env.NEXT_PUBLIC_FEATURE_DATASET !== 'false';
        case FeatureName.Template:
            return process.env.NEXT_PUBLIC_FEATURE_TEMPLATE !== 'false';
        default:
            return true;
    }
};

export const isFeatureEnabled = (name: FeatureName): boolean => getFeatureFlag(name);
