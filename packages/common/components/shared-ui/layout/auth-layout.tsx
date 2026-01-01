import React from 'react';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
            <div className="w-full max-w-md space-y-8">
                {children}
            </div>
        </div>
    );
};
