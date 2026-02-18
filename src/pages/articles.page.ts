import { AddArticleFormComponent } from '../components/addArticle-form.component';
import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlesPage extends BasePage {
  url = '/articles.html';
  mainMenuComponent = new MainMenuComponent(this.page);
  addArticleFormComponent = new AddArticleFormComponent(this.page);
  addArticleButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addArticleButton = this.page.getByRole('button', { name: 'Add Article' });
  }
}
