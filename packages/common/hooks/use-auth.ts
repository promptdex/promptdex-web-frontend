'use client';

import { createAuthClient } from 'better-auth/react';
import { emailOTPClient } from 'better-auth/client/plugins';

// Create auth client for the app
const authClient = createAuthClient({
    baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    plugins: [emailOTPClient()],
});

// Export hooks and methods
export const { useSession, signIn, signUp, signOut } = authClient;
export { authClient };

// Custom hook that provides Clerk-like interface for easier migration
export function useUser() {
    const { data: session, isPending } = useSession();
    
    return {
        user: session?.user ?? null,
        isSignedIn: !!session?.user,
        isLoaded: !isPending,
    };
}

export function useAuth() {
    const { data: session, isPending } = useSession();
    
    return {
        userId: session?.user?.id ?? null,
        isSignedIn: !!session?.user,
        isLoaded: !isPending,
        signOut,
    };
}
