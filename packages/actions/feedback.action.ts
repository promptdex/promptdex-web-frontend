'use server';
import { auth } from '@repo/prisma/auth';
import { headers } from 'next/headers';

export const submitFeedback = async (feedback: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return { error: 'Unauthorized' };
    }

    return feedback;
};
