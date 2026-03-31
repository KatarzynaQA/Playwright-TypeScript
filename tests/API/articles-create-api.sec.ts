import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { loginAndGetAuthorizationToken } from '@_src/api/factories/login-and-get-authorization-token.api';
import { ArticlePayload } from '@_src/api/models/article-payload.api.models';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrl } from '@_src/api/utils/api.utils';
import { APIResponse, expect, test } from '@playwright/test';

test.describe('Verify articles CREATE operations', { tag: '@crud @api @articles' }, () => {
  const articleData = prepareArticlePayload();

  test(
    'Should not create article without a logged-in user',
    { tag: '@GAD-R09-01' },
    async ({ request }) => {
      // Arrange:
      const expectedStatusCode = 401;

      // Act:
      const response = await request.post(apiUrl.articlesUrl, {
        data: articleData,
      });
      // Assert:
      expect(response.status()).toBe(expectedStatusCode);
    },
  );

  test.describe('CRUD operations', () => {
    let responseArticle: APIResponse;
    let headers: Headers;
    let articleData: ArticlePayload;

    test.beforeAll('Should login', async ({ request }) => {
      headers = await loginAndGetAuthorizationToken(request);
    });

    test('Should create an article with logged-in user @GAD-R08-03', async ({ request }) => {
      // Arrange
      const expectedStatusCode = 201;

      //Act
      articleData = prepareArticlePayload();
      responseArticle = await createArticleWithApi(request, headers, articleData);
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
  });
});
