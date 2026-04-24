import { CommentsRequest } from '../requests/comments.request';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { CommentPayload } from '@_src/api/models/comment-payload.api.models';
import { APIResponse, expect } from '@playwright/test';

export async function createCommentWithApi(
  commentsRequest: CommentsRequest,
  articleID: number,
  commentData?: CommentPayload,
): Promise<APIResponse> {
  const commentFinalData = commentData || prepareCommentPayload(articleID);
  const responseComment = await commentsRequest.post(commentFinalData);

  // assert comment
  const commentJson = await responseComment.json();
  const expectedStatusCode = 200;

  await expect(async () => {
    const responseCommentCreated = await commentsRequest.getOne(commentJson.id);

    expect(
      responseCommentCreated.status(),
      `Expected status: ${expectedStatusCode} and observed: ${responseCommentCreated.status()}`,
    ).toBe(expectedStatusCode);
  }).toPass({ timeout: 2_000 });

  return responseComment;
}
