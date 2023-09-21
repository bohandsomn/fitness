import { AssignRoleGuard } from './assign-role.guard.js';

describe('AssignRoleGuard', () => {
  it('should be defined', () => {
    expect(new AssignRoleGuard()).toBeDefined();
  });
});
