/// <reference types="@cloudflare/workers-types" />
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Cloudflare KV wrapper for credit/rate limiting service
 * 
 * This module provides a unified interface for key-value storage that works with:
 * - Cloudflare KV (when deployed to Workers)
 * - In-memory storage (for local development)
 */

// Type for Cloudflare Workers environment
export interface CloudflareEnv {
    RATE_LIMIT_KV?: KVNamespace;
}

// In-memory cache for local development
const memoryCache = new Map<string, { value: string; expiry?: number }>();

/**
 * Get a value from the KV store
 */
export async function kvGet(key: string, env?: CloudflareEnv): Promise<string | null> {
    const cfEnv = env || (await getCloudflareContext()).env as any as CloudflareEnv;
    // Use Cloudflare KV in Workers environment
    if (cfEnv?.RATE_LIMIT_KV) {
        return cfEnv.RATE_LIMIT_KV.get(key);
    }

    // Fallback to in-memory for development
    const cached = memoryCache.get(key);
    if (cached) {
        if (cached.expiry && Date.now() > cached.expiry) {
            memoryCache.delete(key);
            return null;
        }
        return cached.value;
    }
    return null;
}

/**
 * Set a value in the KV store
 */
export async function kvSet(
    key: string,
    value: string,
    env?: CloudflareEnv,
    options?: { expirationTtl?: number }
): Promise<void> {
    const cfEnv = env || (await getCloudflareContext()).env as any as CloudflareEnv;
    // Use Cloudflare KV in Workers environment
    if (cfEnv?.RATE_LIMIT_KV) {
        await cfEnv.RATE_LIMIT_KV.put(key, value, {
            expirationTtl: options?.expirationTtl,
        });
        return;
    }

    // Fallback to in-memory for development
    memoryCache.set(key, {
        value,
        expiry: options?.expirationTtl ? Date.now() + options.expirationTtl * 1000 : undefined,
    });
}

/**
 * Delete a value from the KV store
 */
export async function kvDelete(key: string, env?: CloudflareEnv): Promise<void> {
    const cfEnv = env || (await getCloudflareContext()).env as any as CloudflareEnv;
    if (cfEnv?.RATE_LIMIT_KV) {
        await cfEnv.RATE_LIMIT_KV.delete(key);
        return;
    }
    memoryCache.delete(key);
}

/**
 * Increment a numeric value in the KV store
 * Returns the new value
 */
export async function kvIncr(key: string, env?: CloudflareEnv): Promise<number> {
    const cfEnv = env || (await getCloudflareContext()).env as any as CloudflareEnv;
    if (cfEnv?.RATE_LIMIT_KV) {
        const current = await cfEnv.RATE_LIMIT_KV.get(key);
        const newValue = (parseInt(current || '0', 10) + 1).toString();
        await cfEnv.RATE_LIMIT_KV.put(key, newValue);
        return parseInt(newValue, 10);
    }

    // Fallback to in-memory for development
    const cached = memoryCache.get(key);
    const current = cached ? parseInt(cached.value, 10) : 0;
    const newValue = (current + 1).toString();
    memoryCache.set(key, { value: newValue, expiry: cached?.expiry });
    return current + 1;
}

/**
 * Get remaining credits for a user or IP
 * Automatically resets daily
 */
export async function getCredits(
    identifier: string,
    dailyLimit: number,
    env?: CloudflareEnv
): Promise<number> {
    const key = `credits:${identifier}`;
    const lastRefillKey = `${key}:lastRefill`;
    const today = new Date().toISOString().split('T')[0];

    // Check if we need to refill
    const lastRefill = await kvGet(lastRefillKey, env);

    if (lastRefill !== today) {
        // New day - reset credits
        await kvSet(key, dailyLimit.toString(), env);
        await kvSet(lastRefillKey, today, env, { expirationTtl: 86400 * 2 }); // 2 days TTL
        return dailyLimit;
    }

    // Return current credits
    const current = await kvGet(key, env);
    return current ? parseInt(current, 10) : 0;
}

/**
 * Deduct credits from a user or IP
 * Returns true if successful, false if not enough credits
 */
export async function deductCreditsKV(
    identifier: string,
    cost: number,
    env?: CloudflareEnv
): Promise<boolean> {
    const key = `credits:${identifier}`;
    const current = await kvGet(key, env);
    const remaining = current ? parseInt(current, 10) : 0;

    if (remaining < cost) {
        return false;
    }

    const newValue = Math.max(0, remaining - cost);
    await kvSet(key, newValue.toString(), env);
    return true;
}
