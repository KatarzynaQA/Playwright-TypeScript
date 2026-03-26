import { BasePage } from './base.page';
import { LoginFormComponent } from '@_src/ui/components/login-form.component';
import { UserLoginModel } from '@_src/ui/models/userLogin.model';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  loginFormComponent = new LoginFormComponent(this.page);
  errorLoginMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.errorLoginMessage = this.page.getByTestId('login-error');
  }

  async loginUser(userLoginData: UserLoginModel): Promise<void> {
    await this.loginFormComponent.loginInput.fill(userLoginData.userName);
    await this.loginFormComponent.passwordInput.fill(userLoginData.userPassword);
    await this.loginFormComponent.logInButton.click();
  }
}
