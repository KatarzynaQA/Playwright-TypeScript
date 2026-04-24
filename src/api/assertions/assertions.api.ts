import { ArticlesRequest } from '../requests/articles.request';
import { CommentsRequest } from '../requests/comments.request';
import { expect } from '@_src/merge.fixture';

export async function expectGetOneResponseStatus(
  requestObject: ArticlesRequest | CommentsRequest,
  expectedStatusCode: number,
  id: string,
): Promise<void> {
  const responseGet = await requestObject.getOne(id);
  expect(
    responseGet.status(),
    `expected status code ${expectedStatusCode}, and received ${responseGet.status()}`,
  ).toBe(expectedStatusCode);
}
