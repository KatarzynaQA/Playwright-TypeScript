import { loginAndGetAuthorizationToken, prepareArticlePayload } from '@_src/utils/api.utils';
import { expect, test } from '@playwright/test';

test.describe('Verify articles CRUD operations', { tag: '@crud' }, () => {
  const articleData = prepareArticlePayload();

  test('Should not create article without a logged-in user', async ({ request }) => {
    // Arrange:
    const expectedStatusCode = 401;
    const articlesUrl = 'api/articles';

    // Act:
    const response = await request.post(articlesUrl, {
      data: articleData,
    });
    // Assert:
    expect(response.status()).toBe(expectedStatusCode);
  });

  test(
    'Should create article with a logged-in user',
    { tag: '@GAD-R09-01, @crud' },
    async ({ request }) => {
      //Arrange:
      const headers = await loginAndGetAuthorizationToken(request);
      const expectedStatusCode = 201;
      const articlesUrl = 'api/articles';

      // Act:
      const responseArticle = await request.post(articlesUrl, {
        headers,
        data: articleData,
      });

      // Assert:
      expect(responseArticle.status()).toBe(expectedStatusCode);
    },
  );
});
