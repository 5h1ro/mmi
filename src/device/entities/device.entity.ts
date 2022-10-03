import { Value } from 'src/value/entities/value.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Device {
  @PrimaryColumn()
  device_id: string;

  @Column({
    length: 10,
  })
  parameter: string;

  @Column({
    length: 5,
  })
  unit: string;

  @OneToMany(() => Value, (value) => value.device)
  value: Value[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  constructor(partial: Partial<Device>) {
    Object.assign(this, partial);
  }
}
