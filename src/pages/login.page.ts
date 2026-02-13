import { LoginFormComponent } from '../components/login-form.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  loginFormComponent = new LoginFormComponent(this.page);

  constructor(page: Page) {
    super(page);
  }

  async loginUser(userName: string, userPassword: string): Promise<void> {
    await this.loginFormComponent.loginInput.fill(userName);
    await this.loginFormComponent.passwordInput.fill(userPassword);
    await this.loginFormComponent.logInButton.click();
  }
}
