export const apiLinks = {
  articlesUrl: 'api/articles',
  commentsUrl: 'api/comments',
};
export interface Headers {
  [key: string]: string;
}

export interface ArticleData {
  title: string;
  body: string;
  date: string;
  image: string;
}
export interface CommentData {
  article_id: number;
  body: string;
  date: string;
}
