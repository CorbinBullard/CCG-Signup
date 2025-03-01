import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Field } from '../field/field.entity';
import { Event } from '../event/event.entity';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Field, (field) => field.form)
  fields: Field[];

  @OneToOne(() => Event, (event) => event.form)
  event: Event;
}
