import { RegisterUserModel } from '../models/user.model';
import { faker } from '@faker-js/faker';

export function randomUserData(): RegisterUserModel {
  const registerUserData: RegisterUserModel = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userEmail: '',
    password: faker.internet.password(),
  };

  registerUserData.userEmail = faker.internet.email({
    firstName: registerUserData.userFirstName,
  });

  return registerUserData;
}
