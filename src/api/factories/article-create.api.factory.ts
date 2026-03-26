import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { ArticlePayload } from '@_src/api/models/article-payload.api.models';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrl } from '@_src/api/utils/api.utils';
import { expect } from '@_src/ui/fixtures/merge.fixture';
import { APIRequestContext, APIResponse } from '@playwright/test';

export async function createArticleWithApi(
  request: APIRequestContext,
  headers: Headers,
  articleData?: ArticlePayload,
): Promise<APIResponse> {
  const articleFinalData = articleData || prepareArticlePayload();
  const responseArticle = await request.post(apiUrl.articlesUrl, {
    headers,
    data: articleFinalData,
  });

  // assert article exist
  const articleJson = await responseArticle.json();
  const expectedStatusCode = 200;
  await expect(async () => {
    const responseArticleCreated = await request.get(`${apiUrl.articlesUrl}/${articleJson.id}`);
    expect(
      responseArticleCreated.status(),
      `Expected status: ${expectedStatusCode} and observed: ${responseArticleCreated.status()}`,
    ).toBe(expectedStatusCode);
  }).toPass({ timeout: 2_000 });

  return responseArticle;
}
