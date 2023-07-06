import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { MedicationEntity } from './medication.entity';
import { stateEnum } from '../enums';

@Entity('drones')
export class DroneEntity extends BaseEntity {
  @Column()
  serialNumber: number;

  @Column()
  model: string;

  @Column()
  weightLimit: number;

  @Column()
  batteryCapacity: number;

  @Column({ type: 'enum', enum: stateEnum, default: stateEnum.IDLE })
  state: string;

  @OneToMany(() => MedicationEntity, (medication) => medication.drone)
  medications: MedicationEntity[];
}
