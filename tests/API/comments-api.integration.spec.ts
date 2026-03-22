import { prepareRandomArticleData } from '@_src/factories/article.factory';
import { prepareRandomCommentData } from '@_src/factories/comment.factory';
import { loginAndGetAuthorizationToken } from '@_src/utils/api.utils';
import { expect, test } from '@playwright/test';

test.describe('Verify comment CRUD operations', () => {
  let headers: { [key: string]: string };
  let articleId: number;

  test.beforeAll('Create an article', async ({ request }) => {
    headers = await loginAndGetAuthorizationToken(request);

    const expectedStatusCode = 201;
    const articlesUrl = 'api/articles';

    const randomArticleData = prepareRandomArticleData(4);

    const articleData = {
      title: randomArticleData.articleTitle,
      body: randomArticleData.articleBody,
      date: '2026-03-20T11:02:51.237Z',
      image: 'string',
    };

    const responseArticle = await request.post(articlesUrl, {
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
      const commentsUrl = 'api/comments';
      const randomCommentData = prepareRandomCommentData();

      const commentData = {
        article_id: 12,
        body: randomCommentData.commentBody,
        date: '2024-06-30T15:44:31Z',
      };
      // Act:
      const response = await request.post(commentsUrl, {
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
      const commentsUrl = 'api/comments';

      const randomCommentData = prepareRandomCommentData();

      const commentData = {
        article_id: articleId,
        body: randomCommentData.commentBody,
        date: '2024-06-30T15:44:31Z',
      };

      // Act:
      const responseComment = await request.post(commentsUrl, {
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
