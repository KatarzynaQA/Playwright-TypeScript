import { ArticlePayload } from '../models/article-payload.api.models';
import { apiUrl } from '../utils/api.utils';
import { Headers } from '@_src/api/models/headers.api.model';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class ArticlesRequest {
  url: string;

  constructor(protected request: APIRequestContext) {
    this.url = apiUrl.articlesUrl;
  }

  async get(): Promise<APIResponse> {
    return await this.request.get(this.url);
  }

  async getOne(articleId: string): Promise<APIResponse> {
    return await this.request.get(`${this.url}/${articleId}`);
  }

  async post(headers: Headers, data: ArticlePayload): Promise<APIResponse> {
    return await this.request.post(this.url, {
      headers,
      data,
    });
  }
}
