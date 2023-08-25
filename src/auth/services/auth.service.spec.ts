import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserModule } from '../../user/user.module';
import { TokenModule } from '../../token/token.module';
import { AuthController } from '../controllers/auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, TokenModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
