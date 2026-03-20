import { prepareRandomArticleData } from '@_src/factories/article.factory';
import { expect, test } from '@playwright/test';

test.describe('Verify articles CRUD operations', { tag: '@api' }, () => {
  test('Should not create article without a logged-in user', async ({ request }) => {
    // Arrange:
    const expectedStatusCode = 401;
    const articlesUrl = 'api/articles';
    const randomArticleData = prepareRandomArticleData(4);

    const articleData = {
      title: randomArticleData.articleTitle,
      body: randomArticleData.articleBody,
      date: '2026-03-20T11:02:51.237Z',
      image: 'string',
    };
    // Act:
    const response = await request.post(articlesUrl, {
      data: articleData,
    });
    // Assert:
    expect(response.status()).toBe(expectedStatusCode);
  });
});
