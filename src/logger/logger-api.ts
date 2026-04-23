import { getLogger } from './pino-logger';

export function logConsole(message: string, args?: unknown): void {
  // console.log(`[LOG] ${message}`, args)
  getLogger().info({ args }, `[LOG]: ${message}`);
}

export function logDebug(message: string, args?: unknown): void {
  getLogger().debug({ args }, `[DEBUG]: ${message}`);
}

export function logError(message: string, args?: unknown): void {
  getLogger().error({ args }, `[ERROR]: ${message}`);
}

export function logWarning(message: string, args?: unknown): void {
  getLogger().warn({ args }, `[WARNING]: ${message}`);
}

export function logInfo(message: string, args?: unknown): void {
  getLogger().info({ args }, `[INFO]: ${message}`);
}
