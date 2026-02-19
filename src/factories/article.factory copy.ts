import { NewArticleData } from '../models/article.model';
import { faker } from '@faker-js/faker';

export function randomArticleData(titleLength?: number): NewArticleData {
  let articleTitle: string;

  if (titleLength) articleTitle = faker.string.alpha(titleLength);
  else articleTitle = faker.lorem.sentence();

  const articleBody = faker.lorem.paragraphs(3);

  return { articleTitle, articleBody };
}
