import { auth } from '@/lib/auth';
import { prisma } from '@repo/prisma';
import { geolocation } from '@vercel/functions';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json() as { feedback: string };
    const { feedback } = body;

    await prisma.feedback.create({
        data: {
            userId,
            feedback,
            metadata: JSON.stringify({
                geo: geolocation(request),
            }),
        },
    });

    return NextResponse.json({ message: 'Feedback received' }, { status: 200 });
}
