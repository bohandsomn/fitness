import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service.js';
import { UserModule } from '../../user/user.module.js';
import { OrmModule } from '../../orm/orm.module.js';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        OrmModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        JwtModule.register({
          global: true,
        }),
      ],
      providers: [TokenService],
      exports: [TokenService],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
