import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/article.html';
  articleTitle: Locator;
  articleBody: Locator;
  deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.articleTitle = this.page.getByTestId('article-title');
    this.articleBody = this.page.getByTestId('article-body');
    this.deleteButton = this.page.getByTestId('delete');
  }

  async clickDeleteButton(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.deleteButton.click();
  }
}
