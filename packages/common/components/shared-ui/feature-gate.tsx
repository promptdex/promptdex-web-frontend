'use client';

import React from 'react';
import { Actions, Subjects } from '../../lib/abilities';
import { useAbility } from '../../hooks/use-ability';
import { FeatureName, isFeatureEnabled } from '../../lib/features';

interface FeatureGateProps {
    action?: Actions;
    subject?: Subjects;
    feature?: FeatureName;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const FeatureGate = ({
    action,
    subject,
    feature,
    children,
    fallback = null
}: FeatureGateProps) => {
    const ability = useAbility();

    // Check feature flag first
    if (feature && !isFeatureEnabled(feature)) {
        return <>{fallback}</>;
    }

    // Check CASL permissions
    if (action && subject) {
        if (ability.can(action, subject)) {
            return <>{children}</>;
        }
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
