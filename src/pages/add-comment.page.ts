import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class AddCommentPage extends BasePage {
  url = '/article.html';
  commentBody: Locator;
  saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.commentBody = this.page.locator('#body');
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
  }

  async clickSaveButton(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.saveButton.click();
  }
}
