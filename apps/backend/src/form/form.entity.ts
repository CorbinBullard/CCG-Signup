import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => Field, (field) => field.form, { cascade: true })
  fields: Field[];

  @OneToMany(() => Event, (event) => event.form)
  event: Event[];
}
