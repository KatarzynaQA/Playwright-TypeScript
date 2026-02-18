import { NewArticleData } from '../models/article.model';
import { faker } from '@faker-js/faker';

export function randomArticleData(): NewArticleData {
  const newArticleData: NewArticleData = {
    articleTitle: faker.lorem.sentence(),
    articleBody: faker.lorem.paragraphs(3),
  };

  return newArticleData;
}
