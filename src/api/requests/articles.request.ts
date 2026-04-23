import { apiUrl } from '../utils/api.utils';
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
}
