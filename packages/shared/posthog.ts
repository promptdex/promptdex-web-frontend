import { PostHog } from 'posthog-node';
import { v4 as uuidv4 } from 'uuid';

// Lazy initialization to prevent build-time execution
let _client: PostHog | null = null;

const getClient = (): PostHog => {
    if (!_client) {
        _client = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
            host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        });
    }
    return _client;
};

export enum EVENT_TYPES {
    WORKFLOW_SUMMARY = 'workflow_summary',
}

export type PostHogEvent = {
    event: EVENT_TYPES;
    userId: string;
    properties: Record<string, any>;
};

export const posthog = {
    capture: (event: PostHogEvent) => {
        getClient().capture({
            distinctId: event?.userId || uuidv4(),
            event: event.event,
            properties: event.properties,
        });
    },
    flush: () => {
        getClient().flush();
    },
};
