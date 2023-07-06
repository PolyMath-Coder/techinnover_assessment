import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DroneEntity } from '../shared/entities/drone.entity';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { MedicationEntity } from 'src/shared/entities/medication.entity';

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(DroneEntity)
    private droneRepository: Repository<DroneEntity>,
    @InjectRepository(MedicationEntity)
    private medicationRepository: Repository<MedicationEntity>,
  ) {}
  async registerDrone(createDroneDto: CreateDroneDto) {
    const data = await this.droneRepository.create(createDroneDto);
    console.log(data);
  }

  findAll() {
    return `This action returns all drones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drone`;
  }

  update(id: number, updateDroneDto: UpdateDroneDto) {
    return `This action updates a #${id} drone`;
  }

  remove(id: number) {
    return `This action removes a #${id} drone`;
  }
}
