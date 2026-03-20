import { AddArticleModel } from '@_src/models/article.model';
import { faker } from '@faker-js/faker';

export function prepareRandomArticleData(
  titleLength?: number,
  bodyParagraphs = 5,
): AddArticleModel {
  let articleTitle: string;

  if (titleLength) articleTitle = faker.string.alpha(titleLength);
  else articleTitle = faker.lorem.sentence();

  const articleBody = faker.lorem.paragraphs(bodyParagraphs);

  const newArticle: AddArticleModel = { articleTitle: articleTitle, articleBody: articleBody };

  return newArticle;
}
