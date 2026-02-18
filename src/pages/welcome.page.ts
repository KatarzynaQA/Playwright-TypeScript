import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class WelcomePage extends BasePage {
  url = '/welcome';
  articleButton: Locator;

  constructor(page: Page) {
    super(page);
    this.articleButton = this.page.getByTestId('open-articles');
  }
}
