'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
});

// Export commonly used methods
export const {
    signIn,
    signUp,
    signOut,
    useSession,
    getSession,
} = authClient;

// Types
export type { Session } from 'better-auth/types';
