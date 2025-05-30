import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Field } from 'src/fields/entities/field.entity';
import { Event } from '../event/event.entity';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Field, (field) => field.form, {
    cascade: true,
    eager: true,
  })
  fields: Field[];

  @OneToOne(() => Event, (event) => event.form, {
    onDelete: 'CASCADE',
  })
  event: Event;
}
