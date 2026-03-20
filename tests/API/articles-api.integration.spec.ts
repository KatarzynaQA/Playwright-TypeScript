import { prepareRandomArticleData } from '@_src/factories/article.factory';
import { userData } from '@_src/test-data/user.data';
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

  test(
    'Should create article with a logged-in user',
    { tag: '@GAD-R09-01, @api' },
    async ({ request }) => {
      //Arrange:
      const expectedStatusCode = 201;
      const articlesUrl = 'api/articles';

      const userLoginData = {
        email: userData.userName,
        password: userData.userPassword,
      };

      const randomArticleData = prepareRandomArticleData(4);

      const articleData = {
        title: randomArticleData.articleTitle,
        body: randomArticleData.articleBody,
        date: '2026-03-20T11:02:51.237Z',
        image: 'string',
      };

      //Login
      const loginUrl = 'api/login';
      const responseLogin = await request.post(loginUrl, { data: userLoginData });

      // Validate login response
      expect(responseLogin.status()).toBe(200);
      const responseJson = await responseLogin.json();
      const token = responseJson.access_token;
      expect(token).toBeDefined();

      // Act:
      const responseArticle = await request.post(articlesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: articleData,
      });

      // Assert:
      expect(responseArticle.status()).toBe(expectedStatusCode);
    },
  );
});
