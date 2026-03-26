import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { loginAndGetAuthorizationToken } from '@_src/api/factories/login-and-get-authorization-token.api';
import { ArticlePayload } from '@_src/api/models/article.api.models';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrl } from '@_src/api/utils/api.utils';
import { APIResponse, expect, test } from '@playwright/test';

test.describe('Verify articles CRUD operations', { tag: '@crud' }, () => {
  const articleData = prepareArticlePayload();

  test('Should not create article without a logged-in user', async ({ request }) => {
    // Arrange:
    const expectedStatusCode = 401;

    // Act:
    const response = await request.post(apiUrl.articlesUrl, {
      data: articleData,
    });
    // Assert:
    expect(response.status()).toBe(expectedStatusCode);
  });

  test.describe('crud operations', () => {
    let responseArticle: APIResponse;
    let headers: Headers;
    let articleData: ArticlePayload;

    test.beforeAll('should login', async ({ request }) => {
      headers = await loginAndGetAuthorizationToken(request);
    });

    test.beforeEach('create an article', async ({ request }) => {
      articleData = prepareArticlePayload();
      responseArticle = await request.post(apiUrl.articlesUrl, {
        headers,
        data: articleData,
      });
    });

    test('should create an article with logged-in user @GAD-R08-03', async () => {
      // Arrange
      const expectedStatusCode = 201;

      // Assert
      const actualResponseStatus = responseArticle.status();
      expect(
        actualResponseStatus,
        `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      const articleJson = await responseArticle.json();
      expect.soft(articleJson.title).toEqual(articleData.title);
      expect.soft(articleJson.body).toEqual(articleData.body);
    });

    test('should delete an article with logged-in user @GAD-R08-05', async ({ request }) => {
      // Arrange
      const expectedStatusCode = 200;
      const articleJson = await responseArticle.json();
      const articleId = articleJson.id;

      // Act
      const responseArticleDelete = await request.delete(`${apiUrl.articlesUrl}/${articleId}`, {
        headers,
      });

      // Assert
      const actualResponseStatus = responseArticleDelete.status();
      expect(
        actualResponseStatus,
        `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      // Assert check deleted article
      const responseArticleGet = await request.get(`${apiUrl.articlesUrl}/${articleId}`);
      const expectedDeletedArticleStatusCode = 404;
      expect(
        responseArticleGet.status(),
        `expected status code ${expectedDeletedArticleStatusCode}, and received ${responseArticleGet.status()}`,
      ).toBe(expectedDeletedArticleStatusCode);
    });

    test('should not delete an article with non logged-in user @GAD-R08-05', async ({
      request,
    }) => {
      // Arrange
      const expectedStatusCode = 401;
      const articleJson = await responseArticle.json();
      const articleId = articleJson.id;

      // Act
      const responseArticleDelete = await request.delete(`${apiUrl.articlesUrl}/${articleId}`);

      // Assert
      const actualResponseStatus = responseArticleDelete.status();
      expect(
        actualResponseStatus,
        `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      // Assert check not deleted article
      const responseArticleGet = await request.get(`${apiUrl.articlesUrl}/${articleId}`);
      const expectedNotDeletedArticleStatusCode = 200;
      expect(
        responseArticleGet.status(),
        `expected status code ${expectedNotDeletedArticleStatusCode}, and received ${responseArticleGet.status()}`,
      ).toBe(expectedNotDeletedArticleStatusCode);
    });
  });
});
