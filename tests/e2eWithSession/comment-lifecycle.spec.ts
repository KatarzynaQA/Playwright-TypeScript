import { prepareRandomArticleData } from '../../src/factories/article.factory';
import { prepareRandomCommentData } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { AddCommentModel } from '../../src/models/comment.model';
import { AddCommentPage } from '../../src/pages/add-comment.page';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { EditCommentPage } from '../../src/pages/edit-comment.page';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Operate on comments - create, verify and delete', () => {
  // let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let articlePage: ArticlePage;
  let articleData: AddArticleModel;
  let addCommentPage: AddCommentPage;
  let commentPage: CommentPage;
  let editCommentPage: EditCommentPage;

  test.beforeEach(async ({ page }) => {
    articlesPage = new ArticlesPage(page);
    articlePage = new ArticlePage(page);
    addCommentPage = new AddCommentPage(page);
    commentPage = new CommentPage(page);
    editCommentPage = new EditCommentPage(page);

    articleData = prepareRandomArticleData();

    await articlesPage.goto();

    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);
  });

  test(
    'User can create a new comment',
    { tag: ['@GAD-R05-01, @GAD-R05-02', '@logged'] },
    async () => {
      const newCommentBody = prepareRandomCommentData();

      await test.step('User can create a new comment', async () => {
        // Arrange:
        const expectedSaveMessage = 'Comment was created';

        // Act:
        await articlePage.addCommentsButton.click();
        await addCommentPage.createComment(newCommentBody);

        // Assert:
        await expect(articlesPage.saveAlertPopup).toHaveText(expectedSaveMessage);
      });

      await test.step('Verify comment', async () => {
        // Act:
        const articleComment = articlePage.getArticleComment(newCommentBody.commentBody);

        // Assert:
        await expect(articleComment.body).toHaveText(newCommentBody.commentBody);
        await articleComment.link.click();

        await expect(commentPage.commentBody).toHaveText(newCommentBody.commentBody);
      });

      let editedCommentBody: AddCommentModel;

      await test.step('Update comment', async () => {
        const expectedUpdatedPopupText = 'Comment was updated';

        //Assert
        editedCommentBody = prepareRandomCommentData();
        await commentPage.clickEditCommentButton();

        //Act
        await editCommentPage.updateCommentBody(editedCommentBody);

        // Assert:
        await expect(commentPage.updatedAlertPopup).toHaveText(expectedUpdatedPopupText);
        await expect(commentPage.commentBody).toHaveText(editedCommentBody.commentBody);
      });

      await test.step('Verify update comment on article Page', async () => {
        //Act
        commentPage.clickReturnLink();
        const updatedArticleComment = articlePage.getArticleComment(editedCommentBody.commentBody);

        // Assert:
        await expect(updatedArticleComment.body).toHaveText(editedCommentBody.commentBody);
      });
    },
  );
});
