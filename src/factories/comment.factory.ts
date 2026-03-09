import { AddCommentModel } from '@_src/models/comment.model';
import { faker } from '@faker-js/faker';

export function prepareRandomCommentData(bodySentences = 5): AddCommentModel {
  const commentBody = faker.lorem.sentences(bodySentences);

  return { commentBody };
}
