'use client';

import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AppAbility, defineAbilitiesFor, UserRole } from '../lib/abilities';
import { useUser } from './use-auth';
import { useMemo } from 'react';

export const AbilityContext = createContext<AppAbility>(undefined!);
export const Can = createContextualCan(AbilityContext.Consumer);

export function useAbility() {
    const { user, isSignedIn } = useUser();
    
    const ability = useMemo(() => {
        // Better Auth user roles should be mapped here
        // For now, we use a simple heuristic: if email is admin@..., they are admin
        // Otherwise, if signed in, they are logged.
        let role = UserRole.Public;
        if (isSignedIn) {
            role = user?.email === 'admin@promptdex.com' ? UserRole.Admin : UserRole.Logged;
        }
        return defineAbilitiesFor(role);
    }, [user, isSignedIn]);

    return ability;
}
