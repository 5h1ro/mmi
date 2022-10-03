import { Device } from 'src/device/entities/device.entity';
import { Unit } from 'src/unit/entities/unit.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Value {
  @PrimaryGeneratedColumn('increment', {
    name: 'value_id',
  })
  id: number;

  @Column()
  value: number;

  @ManyToOne(() => Unit, (unit) => unit.value)
  @JoinColumn({ name: 'fk_unit' })
  unit: Unit;

  @ManyToOne(() => Device, (device) => device.value)
  @JoinColumn({ name: 'fk_device' })
  device: Device;

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

  constructor(partial: Partial<Value>) {
    Object.assign(this, partial);
  }
}
