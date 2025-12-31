'use client';

import { Button, InputOTP, InputOTPGroup, InputOTPSlot } from '@repo/ui';
import { IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { signIn, authClient } from '../../hooks/use-auth';

type CustomSignInProps = {
    redirectUrl?: string;
    onClose?: () => void;
};

export const CustomSignIn = ({
    redirectUrl = '/chat',
    onClose,
}: CustomSignInProps) => {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState('');
    const [resending, setResending] = useState(false);
    const router = useRouter();

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailAuth = async () => {
        setIsLoading('email');
        setError('');

        if (!email) {
            setError('Email is required');
            setIsLoading(null);
            return;
        } else if (!validateEmail(email)) {
            setError('Please enter a valid email');
            setIsLoading(null);
            return;
        }

        try {
            const { error: signInError } = await authClient.emailOtp.sendVerificationOtp({
                email,
                type: 'sign-in',
            });

            if (signInError) {
                setError(signInError.message || 'Failed to send verification code');
            } else {
                setVerifying(true);
            }
        } catch (err: any) {
            console.error('Email auth error:', err);
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(null);
        }
    };

    const handleVerify = async (otpValue?: string) => {
        const finalCode = otpValue || code;
        if (finalCode.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        setIsLoading('verify');
        setError('');

        try {
            const { data, error: verifyError } = await signIn.emailOtp({
                email,
                otp: finalCode,
            });

            if (verifyError) {
                setError(verifyError.message || 'Invalid verification code');
            } else if (data) {
                router.push(redirectUrl);
                onClose?.();
            }
        } catch (err: any) {
            console.error('Verification error:', err);
            setError('An unexpected error occurred during verification');
        } finally {
            setIsLoading(null);
        }
    };

    const handleGoogleAuth = async () => {
        setIsLoading('google');
        try {
            await signIn.social({
                provider: 'google',
                callbackURL: redirectUrl,
            });
        } catch (err: any) {
            console.error('Google auth error:', err);
            setError('Failed to authenticate with Google');
            setIsLoading(null);
        }
    };

    const handleGithubAuth = async () => {
        setIsLoading('github');
        try {
            await signIn.social({
                provider: 'github',
                callbackURL: redirectUrl,
            });
        } catch (err: any) {
            console.error('GitHub auth error:', err);
            setError('Failed to authenticate with GitHub');
            setIsLoading(null);
        }
    };

    if (verifying) {
        return (
            <div className="flex w-[300px] flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                    <h2 className="font-clash text-foreground !text-brand text-center text-[24px] font-semibold leading-tight">
                        Check your email
                    </h2>
                    <p className="text-muted-foreground text-center text-sm">
                        We've sent a code to <strong>{email}</strong>. Please check your inbox.
                    </p>
                </div>
                <InputOTP
                    maxLength={6}
                    autoFocus
                    value={code}
                    onChange={setCode}
                    onComplete={(val) => handleVerify(val)}
                >
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <div className="text-center text-sm">
                    {error && <p className="text-rose-400 mb-2">{error}</p>}
                    <p className="text-muted-foreground">
                        Didn't receive an email?{' '}
                        <button
                            className={`text-brand hover:underline disabled:opacity-50`}
                            onClick={handleEmailAuth}
                            disabled={resending || isLoading === 'email'}
                        >
                            {resending ? 'Sending...' : 'Resend Code'}
                        </button>
                    </p>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setVerifying(false)}
                    className="mt-2"
                >
                    Back to sign in
                </Button>
            </div>
        );
    }

    return (
        <div className="relative">
            <Button
                onClick={() => onClose?.()}
                variant="ghost"
                size="icon-sm"
                className="absolute -right-2 -top-2"
            >
                <IconX className="h-4 w-4" />
            </Button>

            <div className="flex w-[320px] flex-col items-center gap-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-foreground text-[24px] font-semibold leading-tight">
                        Welcome back
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Sign in to access your research workflows
                    </p>
                </div>

                <div className="flex w-full flex-col space-y-3">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground px-1">Email Address</label>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleEmailAuth()}
                            />
                            <Button
                                onClick={handleEmailAuth}
                                disabled={isLoading === 'email'}
                                size="sm"
                                className="shrink-0"
                            >
                                {isLoading === 'email' ? '...' : 'Send'}
                            </Button>
                        </div>
                        {error && !verifying && <p className="text-[10px] text-rose-500 px-1">{error}</p>}
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            onClick={handleGoogleAuth}
                            disabled={!!isLoading}
                            variant="bordered"
                            className="bg-background"
                        >
                            <FaGoogle className="mr-2 size-3" />
                            Google
                        </Button>

                        <Button
                            onClick={handleGithubAuth}
                            disabled={!!isLoading}
                            variant="bordered"
                            className="bg-background"
                        >
                            <FaGithub className="mr-2 size-3" />
                            GitHub
                        </Button>
                    </div>
                </div>

                <p className="text-muted-foreground/60 text-center text-[10px]">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="hover:text-foreground underline">Terms</a>{' '}
                    and{' '}
                    <a href="/privacy" className="hover:text-foreground underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};
