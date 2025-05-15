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

  @Column()
  fieldId: number;

  @ManyToOne(() => Signup, (signup) => signup.responses, {
    onDelete: 'CASCADE',
  })
  signup: Signup;

  @ManyToOne(() => Field, (field) => field.responses, { cascade: true })
  @JoinColumn()
  field: Field;

  @Column('json', { nullable: true })
  value: any;
}
