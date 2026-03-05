import { prepareRandomArticleData } from '../../src/factories/article.factory';
import { prepareRandomCommentData } from '../../src/factories/comment.factory';
import { AddArticleModel } from '../../src/models/article.model';
import { AddCommentPage } from '../../src/pages/add-comment.page';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
import { EditCommentPage } from '../../src/pages/edit-comment.page';
import { LoginPage } from '../../src/pages/login.page';
import { WelcomePage } from '../../src/pages/welcome.page';
import { userData } from '../../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.describe('Create, verify and delete comment', () => {
  let loginPage: LoginPage;
  let articlesPage: ArticlesPage;
  let welcomePage: WelcomePage;
  let articlePage: ArticlePage;
  let articleData: AddArticleModel;
  let addCommentPage: AddCommentPage;
  let commentPage: CommentPage;
  let editCommentPage: EditCommentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    welcomePage = new WelcomePage(page);
    articlePage = new ArticlePage(page);
    addCommentPage = new AddCommentPage(page);
    commentPage = new CommentPage(page);
    editCommentPage = new EditCommentPage(page);

    articleData = prepareRandomArticleData();
    await loginPage.goto();
    await loginPage.loginUser(userData);
    await welcomePage.clickArticlesButton();
    await articlesPage.addArticleButton.click();
    await articlesPage.addArticleFormComponent.createNewArticle(articleData);
  });

  test('User can create a new comment', { tag: '@GAD-R05-01, @GAD-R05-02' }, async () => {
    // Arrange:
    const expectedSaveMessage = 'Comment was created';
    const expectedUpdatedPopupText = 'Comment was updated';

    const newCommentBody = prepareRandomCommentData();

    // Act:
    await articlePage.addCommentsButton.click();
    await addCommentPage.createComment(newCommentBody);

    // Assert:
    await expect(articlesPage.saveAlertPopup).toHaveText(expectedSaveMessage);

    const articleComment = articlePage.getArticleComment(newCommentBody.commentBody);
    await expect(articleComment.body).toHaveText(newCommentBody.commentBody);
    await articleComment.link.click();

    await expect(commentPage.commentBody).toHaveText(newCommentBody.commentBody);

    //Edit comment
    const editedCommentBody = prepareRandomCommentData();

    await commentPage.clickEditCommentButton();
    await editCommentPage.updateCommentBody(editedCommentBody);

    await expect(commentPage.updatedAlertPopup).toHaveText(expectedUpdatedPopupText);
    await expect(commentPage.commentBody).toHaveText(editedCommentBody.commentBody);

    commentPage.clickReturnLink();

    const updatedArticleComment = articlePage.getArticleComment(editedCommentBody.commentBody);
    await expect(updatedArticleComment.body).toHaveText(editedCommentBody.commentBody);
  });
});
