import { prepareRandomArticleData } from '../../src/factories/article.factory copy';
import { NewArticleDataModel } from '../../src/models/article.model';
import { AddCommentPage } from '../../src/pages/add-comment.page';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentPage } from '../../src/pages/comment.page';
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
  let articleData: NewArticleDataModel;
  let addCommentPage: AddCommentPage;
  let commentPage: CommentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    welcomePage = new WelcomePage(page);
    articlePage = new ArticlePage(page);
    addCommentPage = new AddCommentPage(page);
    commentPage = new CommentPage(page);

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
    const commentText = 'Hello!';

    // Act:
    await articlePage.addCommentsButton.click();
    await addCommentPage.commentBody.fill(commentText);
    await addCommentPage.clickSaveButton();

    // Assert:
    await expect(articlesPage.saveAlertPopup).toHaveText(expectedSaveMessage);

    const articleComment = articlePage.getArticleComment(commentText);
    await expect(articleComment.body).toHaveText(commentText);
    await articleComment.link.click();

    await expect(commentPage.commentBody).toHaveText(commentText);
  });
});
