import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import domain from '@domain/index';
import application from '@application/index';
import infrastructure from '@infrastructure/index';
import graphql from '@ui/graphql';
import rest from '@ui/rest';

import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@domain/greeting/entity/user.entity';

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: 'production' === process.env.NODE_ENV,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          debug: configService.get<string>('NODE_ENV') === 'development',
          type: 'mysql',
          forceUtcTimezone: true,
          clientUrl: configService.get<string>('MYSQL_URL'),
          entities: [User],
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.graphql'),
    }),
  ],
  providers: [...application, ...graphql, ...domain, ...infrastructure],
  exports: [],
  controllers: [...rest],
})
export class AppModule {}
