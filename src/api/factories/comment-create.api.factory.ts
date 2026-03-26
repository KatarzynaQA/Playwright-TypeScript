import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { CommentPayload } from '@_src/api/models/comment-payload.api.models';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrl } from '@_src/api/utils/api.utils';
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export async function createCommentWithApi(
  request: APIRequestContext,
  headers: Headers,
  articleID: number,
  commentData?: CommentPayload,
): Promise<APIResponse> {
  const commentFinalData = commentData || prepareCommentPayload(articleID);
  const responseComment = await request.post(apiUrl.commentsUrl, {
    headers,
    data: commentFinalData,
  });

  // assert comment
  const commentJson = await responseComment.json();
  const expectedStatusCode = 200;

  await expect(async () => {
    const responseCommentCreated = await request.get(`${apiUrl.commentsUrl}/${commentJson.id}`);
    expect(
      responseCommentCreated.status(),
      `Expected status: ${expectedStatusCode} and observed: ${responseCommentCreated.status()}`,
    ).toBe(expectedStatusCode);
  }).toPass({ timeout: 2_000 });

  return responseComment;
}
