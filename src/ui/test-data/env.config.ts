import * as dotenv from 'dotenv';

dotenv.config({ override: true });

function requireEnvValue(envVariable: string): string {
  const envVariableValue = process.env[envVariable] ?? '[NOT SET]';

  if (envVariableValue === undefined) {
    throw new Error(`Variable "${envVariable}" is not set`);
  }

  return envVariableValue;
}

export const BASE_URL = requireEnvValue('BASE_URL');
export const USER_NAME = requireEnvValue('USER_NAME');
export const USER_PASSWORD = requireEnvValue('USER_PASSWORD');
