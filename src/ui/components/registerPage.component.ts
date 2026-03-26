import { Locator, Page } from '@playwright/test';

export class RegisterPageComponent {
  userFirstNameInput: Locator;
  userLastNameInput: Locator;
  userEmailInput: Locator;
  passwordInput: Locator;
  registerButton: Locator;

  alertPopup: Locator;

  constructor(protected page: Page) {
    this.userFirstNameInput = this.page.getByTestId('firstname-input');
    this.userLastNameInput = this.page.getByTestId('lastname-input');
    this.userEmailInput = this.page.getByTestId('email-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.registerButton = this.page.getByTestId('register-button');
    this.alertPopup = this.page.getByTestId('alert-popup');
  }
}
