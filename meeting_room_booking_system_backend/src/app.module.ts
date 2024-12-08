import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('mysql_server_host'),
        port: configService.get('mysql_server_port'),
        username: configService.get('mysql_server_username'),
        password: configService.get('mysql_server_password'),
        database: configService.get('mysql_server_database'),
        poolSize: 10,
        connectorPackage: 'mysql2',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        extra: {
          authPlugins: 'sha256_password',
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['src/config/.env'],
    }),
    UserModule,
    RedisModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
