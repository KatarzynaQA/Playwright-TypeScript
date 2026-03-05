import { AddCommentModel } from '../models/comment.model';
import { Locator, Page } from '@playwright/test';

export class EditCommentPage {
  commentUpdatedBody: Locator;
  updateButton: Locator;

  constructor(private page: Page) {
    this.commentUpdatedBody = this.page.getByTestId('body-input');
    this.updateButton = this.page.getByTestId('update-button');
  }

  async updateCommentBody(commentData: AddCommentModel): Promise<void> {
    await this.commentUpdatedBody.fill(commentData.commentBody);
    await this.updateButton.click();
  }
}
