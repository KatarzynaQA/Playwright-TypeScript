import { AddCommentModel } from '../models/comment.model';
import { Locator, Page } from '@playwright/test';

export class AddCommentPage {
  commentBody: Locator;
  saveButton: Locator;

  constructor(private page: Page) {
    this.commentBody = this.page.locator('#body');
    this.saveButton = this.page.getByRole('button', { name: 'Save' });
  }

  async clickSaveButton(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.saveButton.click();
  }

  async createComment(commentData: AddCommentModel): Promise<void> {
    await this.commentBody.fill(commentData.commentBody);
    await this.saveButton.click();
  }
}
