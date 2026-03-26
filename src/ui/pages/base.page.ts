import { Locator, Page } from '@playwright/test';

export class BasePage {
  url = '/';
  articlesButton: Locator;

  constructor(protected page: Page) {
    this.articlesButton = this.page.getByTestId('open-articles');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async waitForPageLoadUrl(): Promise<void> {
    await this.page.waitForURL(this.url);
  }

  async clickArticlesButton(): Promise<void> {
    await this.articlesButton.click();
  }
}
