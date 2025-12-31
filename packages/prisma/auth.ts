import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './client';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // Set to true in production
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            enabled: !!process.env.GOOGLE_CLIENT_ID,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
            enabled: !!process.env.GITHUB_CLIENT_ID,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
        },
    },
    trustedOrigins: [
        process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    ],
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }: { email: string; otp: string; type: "sign-in" | "email-verification" | "forget-password" }) {
                console.log(`Sending ${type} OTP to ${email}: ${otp}`);
                // TODO: Implement actual email sending using Resend or similar
            },
        }),
    ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
