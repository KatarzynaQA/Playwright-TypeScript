import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { createCommentWithApi } from '@_src/api/factories/comment-create.api.factory';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { loginAndGetAuthorizationToken } from '@_src/api/factories/login-and-get-authorization-token.api';
import { CommentPayload } from '@_src/api/models/comment-payload.api.models';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrl } from '@_src/api/utils/api.utils';
import { APIResponse, expect, test } from '@playwright/test';

test.describe('Verify comment CREATE operations', () => {
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

  test('Should not create a comment without a logged-in user @GAD-R08-04', async ({ request }) => {
    // Arrange
    const expectedStatusCode = 401;
    const commentData = prepareCommentPayload(articleId);

    // Act:
    const response = await request.post(apiUrl.commentsUrl, {
      data: commentData,
    });
    // Assert:
    expect(response.status()).toBe(expectedStatusCode);
  });

  test.beforeEach('Create a comment', async ({ request }) => {
    commentData = prepareCommentPayload(articleId);
    responseComment = await createCommentWithApi(request, headers, articleId, commentData);

    // TODO linked issue
    await new Promise((resolve) => setTimeout(resolve, 5000));
  });

  test('should create a comment with logged-in user @GAD-R08-04', async () => {
    // Arrange
    const expectedStatusCode = 201;

    // Assert
    const actualResponseStatus = responseComment.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    const comment = await responseComment.json();
    expect.soft(comment.body).toEqual(commentData.body);
  });
});
