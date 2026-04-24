import { expectGetResponseStatus } from '@_src/api/assertions/assertions.api';
import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { createCommentWithApi } from '@_src/api/factories/comment-create.api.factory';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { apiUrl } from '@_src/api/utils/api.utils';
import { expect, test } from '@_src/merge.fixture';
import { APIResponse } from '@playwright/test';

test.describe('Verify comment DELETE operations', () => {
  let articleId: number;
  let responseComment: APIResponse;

  test.beforeAll('Create an article', async ({ articlesRequestLogged }) => {
    const responseArticle = await createArticleWithApi(articlesRequestLogged);

    const article = await responseArticle.json();
    articleId = article.id;
  });

  test.beforeEach('Create a comment', async ({ commentsRequestLogged }) => {
    const commentData = prepareCommentPayload(articleId);
    responseComment = await createCommentWithApi(commentsRequestLogged, articleId, commentData);

    // TODO linked issue
    await new Promise((resolve) => setTimeout(resolve, 5000));
  });

  test(
    'Should delete a comment with logged-in user',
    { tag: '@GAD-R09-04 @api @comments' },
    async ({ request, commentsRequestLogged }) => {
      // Arrange
      const expectedStatusCode = 200;
      const comment = await responseComment.json();

      // Act
      const responseCommentDeleted = await commentsRequestLogged.delete(comment.id);

      // Assert
      const actualResponseStatus = responseCommentDeleted.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      // Assert deleted comment
      const expectedStatusDeletedComment = 404;
      await expectGetResponseStatus(
        request,
        `${apiUrl.commentsUrl}/${comment.id}`,
        expectedStatusDeletedComment,
      );
    },
  );

  test(
    'Should not delete a comment with a non logged-in user',
    { tag: '@GAD-R08-06 @api @comments' },
    async ({ request, commentsRequest }) => {
      // Arrange
      const expectedStatusCode = 401;
      const comment = await responseComment.json();

      // Act
      const responseCommentNotDeleted = await commentsRequest.delete(comment.id);

      // Assert
      const actualResponseStatus = responseCommentNotDeleted.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      // Assert non deleted comment
      const expectedStatusNotDeletedComment = 200;
      await expectGetResponseStatus(
        request,
        `${apiUrl.commentsUrl}/${comment.id}`,
        expectedStatusNotDeletedComment,
      );
    },
  );
});
