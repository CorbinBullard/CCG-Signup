import { IsOptional } from 'class-validator';
import { Field } from 'src/fields/entities/field.entity';
import { Signup } from 'src/signup/signup.entity';
import {
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

  @ManyToOne(() => Signup, (signup) => signup.responses)
  signup: Signup;

  @ManyToOne(() => Field, (field) => field.responses)
  @JoinColumn()
  field: Field;

  @Column('json', { nullable: true })
  value: any;
}
