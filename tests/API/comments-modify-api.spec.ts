import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { createCommentWithApi } from '@_src/api/factories/comment-create.api.factory';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { CommentPayload } from '@_src/api/models/comment-payload.api.models';
import { apiUrl } from '@_src/api/utils/api.utils';
import { expect, test } from '@_src/merge.fixture';
import { APIResponse } from '@playwright/test';

test.describe('Verify comment modify operations', () => {
  let articleId: number;
  let responseComment: APIResponse;
  let commentData: CommentPayload;

  test.beforeAll('Create an article', async ({ articlesRequestLogged }) => {
    const responseArticle = await createArticleWithApi(articlesRequestLogged);

    const article = await responseArticle.json();
    articleId = article.id;
  });

  test(
    'Should not create a comment without a logged-in user',
    { tag: '@GAD-R10-02' },
    async ({ commentsRequest }) => {
      // Arrange
      const expectedStatusCode = 401;
      const commentData = prepareCommentPayload(articleId);

      // Act:
      const response = await commentsRequest.post(commentData);
      // Assert:
      expect(response.status()).toBe(expectedStatusCode);
    },
  );

  test.beforeEach('Create a comment', async ({ commentsRequestLogged }) => {
    commentData = prepareCommentPayload(articleId);
    responseComment = await createCommentWithApi(commentsRequestLogged, articleId, commentData);

    // TODO linked issue
    await new Promise((resolve) => setTimeout(resolve, 5000));
  });

  test.describe('Verify comment fully modify operations @api @modify', () => {
    test('Should modify a comment by complete content replacement via the API for logged-in users @GAD-R10-02', async ({
      commentsRequestLogged,
    }) => {
      // Arrange
      const expectedStatusCode = 200;
      const comment = await responseComment.json();
      const commentId = comment.id;
      const modifiedCommentData = prepareCommentPayload(articleId);

      // Act
      const responseCommentModified = await commentsRequestLogged.put(
        commentId,
        modifiedCommentData,
      );

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
      'Should not modify a comment via the API for not logged-in users',
      { tag: '@GAD-R10-02' },
      async ({ request, commentsRequest }) => {
        // Arrange
        const expectedStatusCode = 401;
        const comment = await responseComment.json();
        const commentId = comment.id;
        const modifiedCommentData = prepareCommentPayload(articleId);

        // Act
        const responseCommentNotModified = await commentsRequest.put(
          commentId,
          modifiedCommentData,
        );

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

  test.describe('Verify comment partially modify operations @api @modify', () => {
    test('Should partially modify a comment by complete content replacement via the API for logged-in users @GAD-R10-04', async ({
      commentsRequestLogged,
    }) => {
      // Arrange
      const expectedStatusCode = 200;
      const comment = await responseComment.json();
      const commentId = comment.id;
      const modifiedCommentData = {
        body: `Modified new body ${new Date().toISOString()}`,
      };

      // Act
      const responseCommentModified = await commentsRequestLogged.patch(
        commentId,
        modifiedCommentData,
      );

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
      'Should not partially modify a comment via the API for not logged-in users',
      { tag: '@GAD-R10-04' },
      async ({ commentsRequest }) => {
        // Arrange
        const expectedStatusCode = 401;
        const comment = await responseComment.json();
        const commentId = comment.id;
        const modifiedCommentData = {
          body: `Modified new body ${new Date().toISOString()}`,
        };

        // Act
        const responseCommentNotModified = await commentsRequest.patch(
          commentId,
          modifiedCommentData,
        );

        // Assert
        const actualResponseStatus = responseCommentNotModified.status();
        expect(
          actualResponseStatus,
          `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
        ).toBe(expectedStatusCode);

        const modifiedCommentGet = await commentsRequest.getOne(comment.id);

        const modifiedCommentJsonGet = await modifiedCommentGet.json();

        expect.soft(modifiedCommentJsonGet.body).toEqual(commentData.body);
        expect.soft(modifiedCommentJsonGet.body).not.toEqual(modifiedCommentData.body);
      },
    );
  });
});
