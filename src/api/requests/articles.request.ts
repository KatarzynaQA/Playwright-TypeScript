import { ArticlePayload } from '../models/article-payload.api.models';
import { apiUrl } from '../utils/api.utils';
import { Headers } from '@_src/api/models/headers.api.model';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class ArticlesRequest {
  url: string;

  constructor(
    protected request: APIRequestContext,
    protected headers?: Headers,
  ) {
    this.url = apiUrl.articlesUrl;
    this.headers = headers;
  }

  async get(): Promise<APIResponse> {
    return await this.request.get(this.url);
  }

  async getOne(articleId: string): Promise<APIResponse> {
    return await this.request.get(`${this.url}/${articleId}`);
  }

  async post(data: ArticlePayload): Promise<APIResponse> {
    return await this.request.post(this.url, {
      headers: this.headers,
      data,
    });
  }

  async delete(articleId: string): Promise<APIResponse> {
    return await this.request.delete(`${this.url}/${articleId}`, {
      headers: this.headers,
    });
  }

  async put(articleId: string, data: ArticlePayload): Promise<APIResponse> {
    return await this.request.put(`${this.url}/${articleId}`, {
      headers: this.headers,
      data,
    });
  }

  async patch(articleId: string, data: Partial<ArticlePayload>): Promise<APIResponse> {
    return await this.request.patch(`${this.url}/${articleId}`, {
      headers: this.headers,
      data,
    });
  }
}
