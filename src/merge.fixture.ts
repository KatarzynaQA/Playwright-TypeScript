import { requestsObjectTest } from './api/fixtures/request-object.fixture';
import { pageObjectTest } from './ui/fixtures/page-object.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest, requestsObjectTest);

export { expect } from '@playwright/test';
