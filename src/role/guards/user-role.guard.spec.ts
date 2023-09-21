import { UserRoleGuard } from './user-role.guard.js';

describe('UserRoleGuard', () => {
  it('should be defined', () => {
    expect(new UserRoleGuard()).toBeDefined();
  });
});
