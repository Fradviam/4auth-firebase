import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const options: PostgresConnectionOptions = {
          type: 'postgres',
          host: configService.database.host,
          port: +configService.database.port,
          username: configService.database.username,
          password: configService.database.password,
          database: configService.database.database,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: false,
        };
        return options;
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
