import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DroneEntity } from '../shared/entities/drone.entity';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { MedicationEntity } from 'src/shared/entities/medication.entity';
import { CreateMedicationDto } from '../medications/dto/create-medication.dto';
import { CustomError } from '../shared/utils/error';
import { stateEnum } from '../shared/enums';

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

    await this.droneRepository.update(
      { id: droneId },
      { state: stateEnum.LOADING },
    );

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
      .where(`droneId = :droneId`, { droneId: drone })
      .select([
        'medications.name',
        'medications.weight',
        'medications.code',
        'medications.image',
      ])
      .getMany();
  }

  async checkAvailableDrones() {
    try {
      return await this.droneRepository.find({
        where: { state: stateEnum.IDLE },
      });
    } catch (error) {
      throw new CustomError(
        'Unable to fetch available drone...',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkDroneBatteryLevel(droneId): Promise<object> {
    const { batteryCapacity } = await this.droneRepository.findOne({
      where: { id: droneId },
    });
    return {
      status: true,
      message: `The battery capacity for this drone is ${batteryCapacity}%`,
    };
  }
}
