import { AppExceptionFilter } from './app-exception.filter.mjs';

describe('AppExceptionFilter', () => {
  it('should be defined', () => {
    expect(new AppExceptionFilter()).toBeDefined();
  });
});
