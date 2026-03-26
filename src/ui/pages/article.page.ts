import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

interface ArticleComment {
  body: Locator;
  link: Locator;
}

export class ArticlePage extends BasePage {
  url = '/article.html';
  articleTitle: Locator;
  articleBody: Locator;
  deleteButton: Locator;
  addCommentsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.articleTitle = this.page.getByTestId('article-title');
    this.articleBody = this.page.getByTestId('article-body');
    this.deleteButton = this.page.getByTestId('delete');
    this.addCommentsButton = this.page.locator('#add-new');
  }

  async clickDeleteButton(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.deleteButton.click();
  }

  getArticleComment(bodyComment: string): ArticleComment {
    const commentContainer = this.page
      .locator('.comment-container')
      .filter({ hasText: bodyComment });

    return {
      body: commentContainer.locator(':text("comment:") + span'),
      link: commentContainer.locator("[id^='gotoComment']"),
    };
  }
}
