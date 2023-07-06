import { Module } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { MedicationsController } from './medications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneEntity } from 'src/shared/entities/drone.entity';
import { MedicationEntity } from 'src/shared/entities/medication.entity';

@Module({
  controllers: [MedicationsController],
  providers: [MedicationsService],
  imports: [TypeOrmModule.forFeature([MedicationEntity, DroneEntity])],
})
export class MedicationsModule {}
