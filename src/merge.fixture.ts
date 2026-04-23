import { pageObjectTest } from './ui/fixtures/page-object.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest);

export { expect } from '@playwright/test';
