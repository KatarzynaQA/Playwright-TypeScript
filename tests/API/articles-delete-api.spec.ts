import { expectGetResponseStatus } from '@_src/api/assertions/assertions.api';
import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { ArticlePayload } from '@_src/api/models/article-payload.api.models';
import { apiUrl } from '@_src/api/utils/api.utils';
import { expect, test } from '@_src/merge.fixture';
import { APIResponse } from '@playwright/test';

test.describe('Verify articles DELETE operations', { tag: '@crud @api' }, () => {
  let responseArticle: APIResponse;

  let articleData: ArticlePayload;

  test.beforeEach('Create an article', async ({ articlesRequestLogged }) => {
    articleData = prepareArticlePayload();
    responseArticle = await createArticleWithApi(articlesRequestLogged, articleData);
  });

  test(
    'Should delete an article with logged-in user',
    { tag: '@GAD-R09-03' },
    async ({ request, articlesRequestLogged }) => {
      // Arrange
      const expectedStatusCode = 200;
      const articleJson = await responseArticle.json();
      const articleId = articleJson.id;

      // Act
      const responseArticleDelete = await articlesRequestLogged.delete(articleId);

      // Assert
      const actualResponseStatus = responseArticleDelete.status();
      expect(
        actualResponseStatus,
        `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      // Assert check deleted article
      const expectedDeletedArticleStatusCode = 404;
      await expectGetResponseStatus(
        request,
        `${apiUrl.articlesUrl}/${articleId}`,
        expectedDeletedArticleStatusCode,
      );
    },
  );

  test(
    'Should not delete an article with non logged-in user',
    { tag: '@GAD-R09-03' },
    async ({ request, articlesRequest }) => {
      // Arrange
      const expectedStatusCode = 401;
      const articleJson = await responseArticle.json();
      const articleId = articleJson.id;

      // Act
      const responseArticleDelete = await articlesRequest.delete(articleId);

      // Assert
      const actualResponseStatus = responseArticleDelete.status();
      expect(
        actualResponseStatus,
        `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      // Assert check not deleted article
      const expectedNotDeletedArticleStatusCode = 200;
      await expectGetResponseStatus(
        request,
        `${apiUrl.articlesUrl}/${articleId}`,
        expectedNotDeletedArticleStatusCode,
      );
    },
  );
});
