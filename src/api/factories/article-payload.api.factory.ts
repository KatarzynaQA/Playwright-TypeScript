import { ArticleData } from '../utils/api.utils';
import { prepareRandomArticleData } from '@_src/ui/factories/article.factory';

export function prepareArticlePayload(): ArticleData {
  const randomArticleData = prepareRandomArticleData();

  const articleData = {
    title: randomArticleData.articleTitle,
    body: randomArticleData.articleBody,
    date: '2026-03-20T11:02:51.237Z',
    image: 'string',
  };

  return articleData;
}
