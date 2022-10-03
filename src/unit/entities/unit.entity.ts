import { Value } from 'src/value/entities/value.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn('increment', {
    name: 'unit_id',
  })
  unit_id: number;

  @OneToMany(() => Value, (value) => value.unit)
  value: Value[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  constructor(partial: Partial<Unit>) {
    Object.assign(this, partial);
  }
}
