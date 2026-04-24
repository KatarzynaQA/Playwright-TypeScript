import { LoginData } from '../models/login.api.model';
import { apiUrl } from '../utils/api.utils';
import { Headers } from '@_src/api/models/headers.api.model';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class LoginRequest {
  url: string;

  constructor(
    protected request: APIRequestContext,
    protected headers?: Headers,
  ) {
    this.url = apiUrl.loginUrl;
    this.headers = headers;
  }

  async get(): Promise<APIResponse> {
    return await this.request.get(this.url, {
      headers: this.headers,
    });
  }

  async post(data: LoginData): Promise<APIResponse> {
    return await this.request.post(this.url, {
      headers: this.headers,
      data,
    });
  }
}
