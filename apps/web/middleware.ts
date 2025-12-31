import { NextResponse, type NextRequest } from 'next/server';

// BetterAuth doesn't require middleware for basic auth
// This middleware is simplified - add custom logic as needed
export async function middleware(request: NextRequest) {
    // Add any custom middleware logic here
    // For example, protecting routes, adding headers, etc.
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/:path*',
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};
