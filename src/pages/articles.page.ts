import { BasePage } from './base.page';
import { AddArticleFormComponent } from '@_src/components/add-article-form.component';
import { MainMenuComponent } from '@_src/components/main-menu.component';
import { Locator, Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenuComponent = new MainMenuComponent(this.page);
  addArticleFormComponent = new AddArticleFormComponent(this.page);
  addArticleButton: Locator;
  saveAlertPopup: Locator;

  constructor(page: Page) {
    super(page);
    this.addArticleButton = this.page.getByRole('button', { name: 'Add Article' });
    this.saveAlertPopup = this.page.getByTestId('alert-popup');
  }

  async goToArticle(articleTitle: string): Promise<void> {
    await this.page.getByText(articleTitle).click();
  }
}
