import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Form } from '../form/form.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('string')
  name: string;

  @Column()
  type: string;

  @Column()
  required: boolean;

  @Column()
  description: string;

  @ManyToOne(() => Form, (form) => form.fields)
  form: Form;
}
