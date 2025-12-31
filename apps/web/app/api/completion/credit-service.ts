import { getCredits, deductCreditsKV, type CloudflareEnv } from '@/lib/cloudflare-kv';

export const DAILY_CREDITS_AUTH = process.env.FREE_CREDITS_LIMIT_REQUESTS_AUTH
    ? parseInt(process.env.FREE_CREDITS_LIMIT_REQUESTS_AUTH)
    : 0;

export const DAILY_CREDITS_IP = process.env.FREE_CREDITS_LIMIT_REQUESTS_IP
    ? parseInt(process.env.FREE_CREDITS_LIMIT_REQUESTS_IP)
    : 0;

export type RequestIdentifier = {
    userId?: string;
    ip?: string;
};

/**
 * Get remaining credits for a user or IP
 */
export async function getRemainingCredits(
    identifier: RequestIdentifier,
    env?: CloudflareEnv
): Promise<number> {
    const { userId, ip } = identifier;

    if (userId) {
        return getRemainingCreditsForUser(userId, env);
    } else if (ip) {
        return getRemainingCreditsForIp(ip, env);
    }

    return 0;
}

async function getRemainingCreditsForUser(userId: string, env?: CloudflareEnv): Promise<number> {
    if (DAILY_CREDITS_AUTH === 0) {
        return 0;
    }

    try {
        return await getCredits(`user:${userId}`, DAILY_CREDITS_AUTH, env);
    } catch (error) {
        console.error('Failed to get remaining credits for user:', error);
        return 0;
    }
}

async function getRemainingCreditsForIp(ip: string, env?: CloudflareEnv): Promise<number> {
    if (DAILY_CREDITS_IP === 0) {
        return 0;
    }

    try {
        return await getCredits(`ip:${ip}`, DAILY_CREDITS_IP, env);
    } catch (error) {
        console.error('Failed to get remaining credits for IP:', error);
        return 0;
    }
}

/**
 * Deduct credits from a user or IP
 * Returns true if successful, false if not enough credits
 */
export async function deductCredits(
    identifier: RequestIdentifier,
    cost: number,
    env?: CloudflareEnv
): Promise<boolean> {
    const { userId, ip } = identifier;

    if (userId) {
        return deductCreditsFromUser(userId, cost, env);
    } else if (ip) {
        return deductCreditsFromIp(ip, cost, env);
    }

    return false;
}

async function deductCreditsFromUser(
    userId: string,
    cost: number,
    env?: CloudflareEnv
): Promise<boolean> {
    try {
        return await deductCreditsKV(`user:${userId}`, cost, env);
    } catch (error) {
        console.error('Failed to deduct credits from user:', error);
        return false;
    }
}

async function deductCreditsFromIp(
    ip: string,
    cost: number,
    env?: CloudflareEnv
): Promise<boolean> {
    try {
        return await deductCreditsKV(`ip:${ip}`, cost, env);
    } catch (error) {
        console.error('Failed to deduct credits from IP:', error);
        return false;
    }
}
