import { Module } from '@nestjs/common';
import { DronesService } from './drones.service';
import { DronesController } from './drones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationEntity } from '../shared/entities/medication.entity';
import { DroneEntity } from '../shared/entities/drone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DroneEntity, MedicationEntity])],
  controllers: [DronesController],
  providers: [DronesService],
})
export class DronesModule {}
