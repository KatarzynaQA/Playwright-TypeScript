import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { createCommentWithApi } from '@_src/api/factories/comment-create.api.factory';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { loginAndGetAuthorizationToken } from '@_src/api/factories/login-and-get-authorization-token.api';
import { CommentPayload } from '@_src/api/models/comment-payload.api.models';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrl } from '@_src/api/utils/api.utils';
import { APIResponse, expect, test } from '@playwright/test';

test.describe('Verify comment MODIFY operations', () => {
  let articleId: number;
  let headers: Headers;
  let responseComment: APIResponse;
  let commentData: CommentPayload;

  test.beforeAll('Create an article', async ({ request }) => {
    headers = await loginAndGetAuthorizationToken(request);
    const responseArticle = await createArticleWithApi(request, headers);

    const article = await responseArticle.json();
    articleId = article.id;
  });

  test(
    'Should not create a comment without a logged-in user',
    { tag: '@GAD-R10-02' },
    async ({ request }) => {
      // Arrange
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

  test.beforeEach('Create a comment', async ({ request }) => {
    commentData = prepareCommentPayload(articleId);
    responseComment = await createCommentWithApi(request, headers, articleId, commentData);

    // TODO linked issue
    await new Promise((resolve) => setTimeout(resolve, 5000));
  });

  test('Comments can be modified by complete content replacement via the API for logged-in users @GAD-R10-02', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 200;
    const comment = await responseComment.json();
    const modifiedCommentData = prepareCommentPayload(articleId);

    // Act
    const responseCommentModified = await request.put(`${apiUrl.commentsUrl}/${comment.id}`, {
      headers,
      data: modifiedCommentData,
    });

    // Assert
    const actualResponseStatus = responseCommentModified.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    const modifiedCommentJson = await responseCommentModified.json();

    expect.soft(modifiedCommentJson.body).not.toEqual(commentData.body);
    expect.soft(modifiedCommentJson.body).toEqual(modifiedCommentData.body);
  });

  test(
    'Comments can not be modified via the API for not logged-in users',
    { tag: '@GAD-R10-02' },
    async ({ request }) => {
      // Arrange
      const expectedStatusCode = 401;
      const comment = await responseComment.json();
      const modifiedCommentData = prepareCommentPayload(articleId);

      // Act
      const responseCommentNotModified = await request.put(`${apiUrl.commentsUrl}/${comment.id}`, {
        data: modifiedCommentData,
      });

      // Assert
      const actualResponseStatus = responseCommentNotModified.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      const modifiedCommentGet = await request.get(`${apiUrl.commentsUrl}/${comment.id}`);

      const modifiedCommentJsonGet = await modifiedCommentGet.json();

      expect.soft(modifiedCommentJsonGet.body).toEqual(commentData.body);
      expect.soft(modifiedCommentJsonGet.body).not.toEqual(modifiedCommentData.body);
    },
  );
});
