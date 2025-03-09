import { Field } from 'src/fields/entities/field.entity';
import { Signup } from 'src/signup/signup.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Signup, (signup) => signup.response)
  signup: Signup;

  @ManyToOne(() => Field, (field) => field.responses)
  @JoinColumn()
  field: Field;

  @Column('json')
  value: any;
}
