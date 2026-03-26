import { prepareRandomArticleData } from '@_src/ui/factories/article.factory';
import { prepareRandomCommentData } from '@_src/ui/factories/comment.factory';
import { expect, test } from '@_src/ui/fixtures/merge.fixture';
import { AddArticleModel } from '@_src/ui/models/article.model';
import { ArticlePage } from '@_src/ui/pages/article.page';
import { ArticlesPage } from '@_src/ui/pages/articles.page';
import { waitForResponse } from '@_src/ui/utils/wait.util';

test.describe('verify comment creation', () => {
  let articlesPage: ArticlesPage;
  let articlePage: ArticlePage;
  let articleData: AddArticleModel;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);

    await articlesPage.goto();

    articleData = prepareRandomArticleData();
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);
  });

  test(
    'Should return created comment from API',
    { tag: ['@GAD-R07-06', '@logged'] },
    async ({ page, addCommentPage }) => {
      // Arrange:
      const expectedSaveMessage = 'Comment was created';
      const newCommentBody = prepareRandomCommentData();

      // Act:
      await articlePage.addCommentsButton.click();
      const responsePromise = waitForResponse(page, '/api/comments', 'GET');
      await addCommentPage.createComment(newCommentBody);

      const response = await responsePromise;

      // Assert:
      await expect(articlesPage.saveAlertPopup).toHaveText(expectedSaveMessage);

      expect(response.ok).toBeTruthy();
    },
  );
});
