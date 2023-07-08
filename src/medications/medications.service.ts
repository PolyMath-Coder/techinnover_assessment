import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { MedicationEntity } from '../shared/entities/medication.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DroneEntity } from 'src/shared/entities/drone.entity';

@Injectable()
export class MedicationsService {
  @InjectRepository(MedicationEntity)
  private medicationRepository: Repository<MedicationEntity>;
  @InjectRepository(DroneEntity)
  private droneRepository: Repository<DroneEntity>;

  async registerMedication(createMedicationDto: CreateMedicationDto) {
    console.log(createMedicationDto);

    return await this.medicationRepository.save(createMedicationDto);

    // return 'This action adds a new medication';
  }

  findAll() {
    return `This action returns all medications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medication`;
  }

  update(id: number, updateMedicationDto: UpdateMedicationDto) {
    return `This action updates a #${id} medication`;
  }

  remove(id: number) {
    return `This action removes a #${id} medication`;
  }
}
