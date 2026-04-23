import { ArticlesRequest } from '../requests/articles.request';
import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { ArticlePayload } from '@_src/api/models/article-payload.api.models';
import { Headers } from '@_src/api/models/headers.api.model';
import { expect } from '@_src/merge.fixture';
import { APIResponse } from '@playwright/test';

export async function createArticleWithApi(
  articlesRequest: ArticlesRequest,
  headers: Headers,
  articleData?: ArticlePayload,
): Promise<APIResponse> {
  const articleFinalData = articleData || prepareArticlePayload();
  const responseArticle = await articlesRequest.post(headers, articleFinalData);

  // assert article exist
  const articleJson = await responseArticle.json();
  const expectedStatusCode = 200;
  await expect(async () => {
    const responseArticleCreated = await articlesRequest.getOne(articleJson.id);

    expect(
      responseArticleCreated.status(),
      `Expected status: ${expectedStatusCode} and observed: ${responseArticleCreated.status()}`,
    ).toBe(expectedStatusCode);
  }).toPass({ timeout: 2_000 });

  return responseArticle;
}
