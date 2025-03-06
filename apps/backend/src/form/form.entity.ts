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

  @Column({ default: false })
  isSaved: boolean;

  @OneToMany(() => Field, (field) => field.form, { cascade: true, eager: true })
  fields: Field[];

  @OneToOne(() => Event, (event) => event.form)
  event: Event;
}
