import { ArticlePayload } from '@_src/api/models/article-payload.api.models';
import { prepareRandomArticleData } from '@_src/ui/factories/article.factory';

export function prepareArticlePayload(): ArticlePayload {
  const randomArticleData = prepareRandomArticleData();

  const articleData = {
    title: randomArticleData.articleTitle,
    body: randomArticleData.articleBody,
    date: new Date().toISOString(),
    image: 'string',
  };

  return articleData;
}
