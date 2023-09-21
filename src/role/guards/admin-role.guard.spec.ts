import { AdminRoleGuard } from './admin-role.guard.js';

describe('AdminRoleGuard', () => {
  it('should be defined', () => {
    expect(new AdminRoleGuard()).toBeDefined();
  });
});
