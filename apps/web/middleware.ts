import { NextResponse, type NextRequest } from 'next/server';

// BetterAuth doesn't require middleware for basic auth
// This middleware is simplified - add custom logic as needed
export async function middleware(request: NextRequest) {
    if (process.env.MAINTENANCE_MODE === 'true') {
        // Allow access to maintenance page and assets
        if (
            !request.nextUrl.pathname.startsWith('/maintenance') &&
            !request.nextUrl.pathname.startsWith('/_next') &&
            !request.nextUrl.pathname.startsWith('/static')
        ) {
            return NextResponse.redirect(new URL('/maintenance', request.url));
        }
    } else {
        // If maintenance mode is off but we are on maintenance page, redirect home
        if (request.nextUrl.pathname.startsWith('/maintenance')) {
             return NextResponse.redirect(new URL('/', request.url));
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/:path*',
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    ],
};
