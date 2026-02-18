import { NewArticleData } from '../models/article.model';
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

  async createNewArticle(newArticleData: NewArticleData): Promise<void> {
    await this.titleInput.fill(newArticleData.articleTitle);
    await this.bodyArticleText.fill(newArticleData.articleBody);
    await this.saveArticleButton.click();
  }
}
