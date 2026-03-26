import { Locator, Page } from '@playwright/test';

export class LoginFormComponent {
  loginInput: Locator;
  passwordInput: Locator;
  logInButton: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByRole('textbox', { name: 'Enter User Email' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Enter Password' });
    this.logInButton = this.page.getByRole('button', { name: 'LogIn' });
  }
}
