import { Locator, Page } from '@playwright/test';

export class AddArticleFormComponent {
  titleInput: Locator;
  bodyArticleText: Locator;
  saveArticleButton: Locator;
  saveAlertPopup: Locator;

  constructor(private page: Page) {
    this.titleInput = this.page.getByTestId('title-input');
    this.bodyArticleText = this.page.getByTestId('body-text');
    this.saveArticleButton = this.page.getByTestId('save');
    this.saveAlertPopup = this.page.getByTestId('alert-popup');
  }

  async createNewArticle(title: string, articleBody: string): Promise<void> {
    await this.titleInput.fill(title);
    await this.bodyArticleText.fill(articleBody);
    await this.saveArticleButton.click();
  }
}
