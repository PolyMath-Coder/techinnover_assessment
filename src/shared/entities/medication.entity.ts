import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DroneEntity } from './drone.entity';

@Entity('medications')
export class MedicationEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  code: string;

  @Column()
  image?: string;

  @ManyToOne(() => DroneEntity, (drone) => drone.medications)
  drone: DroneEntity;
}
