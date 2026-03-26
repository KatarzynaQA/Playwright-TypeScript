import { CommentPayload } from '../models/comment.api.models';
import { prepareRandomCommentData } from '@_src/ui/factories/comment.factory';

export function prepareCommentPayload(articleId: number): CommentPayload {
  const randomCommentData = prepareRandomCommentData();

  const commentData = {
    article_id: articleId,
    body: randomCommentData.commentBody,
    date: '2024-06-30T15:44:31Z',
  };
  return commentData;
}
