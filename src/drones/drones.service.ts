import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DroneEntity } from '../shared/entities/drone.entity';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { MedicationEntity } from 'src/shared/entities/medication.entity';
import { CreateMedicationDto } from '../medications/dto/create-medication.dto';
import { CustomError } from '../shared/utils/error';

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(DroneEntity)
    private droneRepository: Repository<DroneEntity>,
    @InjectRepository(MedicationEntity)
    private medicationRepository: Repository<MedicationEntity>,
  ) {}
  async registerDrone(createDroneDto: CreateDroneDto) {
    const data = await this.droneRepository.save(createDroneDto);

    return data;
  }

  async loadDrone(droneId, createMedication: CreateMedicationDto) {
    const { name, weight, code, image } = createMedication;
    // const inputtedMedication = await this.medicationRepository.create(
    //   createMedication,
    // );
    const { batteryCapacity, weightLimit } = await this.droneRepository.findOne(
      { where: { id: droneId } },
    );
    if (batteryCapacity < 25) {
      throw new CustomError(
        'Oops! This drone has a really low battery capacity...',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (weight > 500) {
      throw new CustomError(
        "Oops! This medication exceeds the drone's weight limit...",
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.medicationRepository.save({
      name,
      weight,
      code,
      image,
      droneId,
    });
  }

  async checkMedItems(drone) {
    return await this.medicationRepository
      .createQueryBuilder('medications')
      .where(`medications.droneId = :droneId`, { droneId: drone })
      .select([
        'medications.name',
        'medications.weight',
        'medications.code',
        'medications.image',
      ])
      .getMany();
  }

  update(id: number, updateDroneDto: UpdateDroneDto) {
    return `This action updates a #${id} drone`;
  }

  remove(id: number) {
    return `This action removes a #${id} drone`;
  }
}
