import { UserPayloadDto } from './user-payload.dto';

describe('UserPayloadDto', () => {
  it('should be defined', () => {
    expect(new UserPayloadDto()).toBeDefined();
  });
});
