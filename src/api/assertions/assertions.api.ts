import { expect } from '@_src/merge.fixture';
import { APIRequestContext } from '@playwright/test';

export async function expectGetResponseStatus(
  request: APIRequestContext,
  url: string,
  expectedStatusCode: number,
): Promise<void> {
  const responseGet = await request.get(url);
  expect(
    responseGet.status(),
    `expected status code ${expectedStatusCode}, and received ${responseGet.status()}`,
  ).toBe(expectedStatusCode);
}
