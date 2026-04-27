import { CommentPayload } from '../models/comment-payload.api.models';
import { apiUrl } from '../utils/api.utils';
import { Headers } from '@_src/api/models/headers.api.model';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class CommentsRequest {
  url: string;

  constructor(
    protected request: APIRequestContext,
    protected headers?: Headers,
  ) {
    this.url = apiUrl.commentsUrl;
    this.headers = headers;
  }

  async get(): Promise<APIResponse> {
    return await this.request.get(this.url, {
      headers: this.headers,
    });
  }
  async getOne(articleId: string): Promise<APIResponse> {
    return await this.request.get(`${this.url}/${articleId}`, {
      headers: this.headers,
    });
  }

  async post(data: CommentPayload): Promise<APIResponse> {
    return await this.request.post(this.url, {
      headers: this.headers,
      data,
    });
  }

  async delete(commentId: string): Promise<APIResponse> {
    return await this.request.delete(`${this.url}/${commentId}`, {
      headers: this.headers,
    });
  }

  async put(commentId: string, data: CommentPayload): Promise<APIResponse> {
    return await this.request.put(`${this.url}/${commentId}`, {
      headers: this.headers,
      data,
    });
  }

  async patch(commentId: string, data: Partial<CommentPayload>): Promise<APIResponse> {
    return await this.request.patch(`${this.url}/${commentId}`, {
      headers: this.headers,
      data,
    });
  }
}
