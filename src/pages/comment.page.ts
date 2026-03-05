import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class CommentPage extends BasePage {
  url = '/comment.html';
  mainMenuComponent = new MainMenuComponent(this.page);
  commentBody: Locator;
  editCommentButton: Locator;
  updatedAlertPopup: Locator;
  returnLink: Locator;

  constructor(page: Page) {
    super(page);
    this.commentBody = this.page.getByTestId('comment-body');
    this.editCommentButton = this.page.getByTestId('edit');
    this.updatedAlertPopup = this.page.getByTestId('alert-popup');
    this.returnLink = this.page.getByTestId('return');
  }

  async clickEditCommentButton(): Promise<void> {
    await this.editCommentButton.click();
  }

  async clickReturnLink(): Promise<void> {
    await this.returnLink.click();
  }
}
