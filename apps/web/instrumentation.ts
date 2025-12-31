import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: 'https://6d36ec27b0ea6262fd78c5cc8f5e94ca@o4504080709648384.ingest.us.sentry.io/4507756300533760',
      tracesSampleRate: 1,
      debug: false,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: 'https://6d36ec27b0ea6262fd78c5cc8f5e94ca@o4504080709648384.ingest.us.sentry.io/4507756300533760',
      tracesSampleRate: 1,
      debug: false,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
