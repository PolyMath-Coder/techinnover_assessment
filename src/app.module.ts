import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DronesModule } from './drones/drones.module';
import { MedicationsModule } from './medications/medications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: 'root',
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
    }),
    DronesModule,
    MedicationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
