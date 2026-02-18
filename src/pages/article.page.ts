import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/article.html';
  articleTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.articleTitle = this.page.getByTestId('article-title');
  }
}
