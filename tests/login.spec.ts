import { expect, test } from '../src/fixtures/merge.fixture';
import { UserLoginModel } from '../src/models/userLogin.model';
import { userData } from '../src/test-data/user.data';

test.describe('Verify user login to account', () => {
  test(
    'User can login with correct credentials',
    { tag: '@GAD-R02 @S02' },
    async ({ welcomePage, loginPage }) => {
      // Arrange:
      const expectedPageTitle = 'Welcome';

      // Act:
      await loginPage.loginUser(userData);

      const welcomeTitle = await welcomePage.getTitle();

      // Assert:
      expect(welcomeTitle).toContain(expectedPageTitle);
    },
  );

  test(
    'User can not login with incorrect credentials',
    { tag: '@GAD-R02 @S02' },
    async ({ loginPage }) => {
      // Arrange:
      const expectedErrorMessage = 'Invalid username or password';

      const userLoginData: UserLoginModel = {
        userName: userData.userName,
        userPassword: 'incorrectPass',
      };

      // Act:
      await loginPage.loginUser(userLoginData);

      // Assert:
      const title = await loginPage.getTitle();
      expect.soft(title).toContain('Login');
      await expect.soft(loginPage.errorLoginMessage).toHaveText(expectedErrorMessage);
    },
  );
});
