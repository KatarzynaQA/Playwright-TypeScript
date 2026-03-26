import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { loginAndGetAuthorizationToken } from '@_src/api/factories/login-and-get-authorization-token.api';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrl } from '@_src/api/utils/api.utils';
import { expect, test } from '@playwright/test';

test.describe('Verify comment CRUD operations', () => {
  let headers: Headers;
  let articleId: number;

  test.beforeAll('Create an article', async ({ request }) => {
    headers = await loginAndGetAuthorizationToken(request);

    const expectedStatusCode = 201;

    const articleData = prepareArticlePayload();

    const responseArticle = await request.post(apiUrl.articlesUrl, {
      headers,
      data: articleData,
    });

    const article = await responseArticle.json();
    articleId = article.id;

    expect(responseArticle.status()).toBe(expectedStatusCode);
  });

  test(
    'Should not create comment without a logged-in user',
    { tag: '@crud' },
    async ({ request }) => {
      // Arrange:
      const expectedStatusCode = 401;

      const commentData = prepareCommentPayload(articleId);

      // Act:
      const response = await request.post(apiUrl.commentsUrl, {
        data: commentData,
      });
      // Assert:
      expect(response.status()).toBe(expectedStatusCode);
    },
  );

  test(
    'Should create comment with a logged-in user',
    { tag: '@GAD-R09-02, @api' },
    async ({ request }) => {
      //Arrange:
      const expectedStatusCode = 201;
      const commentData = prepareCommentPayload(articleId);

      // Act:
      const responseComment = await request.post(apiUrl.commentsUrl, {
        headers,
        data: commentData,
      });

      const comment = await responseComment.json();

      // Assert:
      expect(responseComment.status()).toBe(expectedStatusCode);
      expect(comment.body).toBe(commentData.body);
    },
  );
});
