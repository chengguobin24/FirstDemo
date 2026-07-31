import { AsyncLocalStorage } from "node:async_hooks";

export interface CloudflareEnv {
  DB?: D1Database;
}

const cloudflareEnvStorage = new AsyncLocalStorage<CloudflareEnv>();

export function runWithCloudflareEnv<T>(
  env: CloudflareEnv,
  callback: () => T,
): T {
  return cloudflareEnvStorage.run(env, callback);
}

export function getCloudflareEnv(): CloudflareEnv | undefined {
  return cloudflareEnvStorage.getStore();
}

export function getD1Database(): D1Database | null {
  return getCloudflareEnv()?.DB ?? null;
}
