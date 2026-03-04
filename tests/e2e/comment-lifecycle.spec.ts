import { prepareRandomArticleData } from '../../src/factories/article.factory copy';
import { NewArticleDataModel } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/add-article.page';
import { AddCommentPage } from '../../src/pages/add-comment.page';
import { ArticlesPage } from '../../src/pages/articles.page';
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
  let commentPage: AddCommentPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlesPage = new ArticlesPage(page);
    welcomePage = new WelcomePage(page);
    articlePage = new ArticlePage(page);
    commentPage = new AddCommentPage(page);

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

    // Act:
    await articlePage.addCommentsButton.click();
    await commentPage.commentBody.fill('Hello!');
    await commentPage.clickSaveButton();

    // Assert:
    await expect(articlesPage.saveAlertPopup).toHaveText(expectedSaveMessage);
  });
});
