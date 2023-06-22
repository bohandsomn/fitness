import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { UserModule } from '../user/user.module';
import { OrmModule } from '../orm/orm.module';

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
