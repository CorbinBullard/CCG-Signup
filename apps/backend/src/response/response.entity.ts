import { Field } from 'src/field/field.entity';
import { Signup } from 'src/signup/signup.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Signup, (signup) => signup.response)
  signup: Signup;

  @ManyToOne(() => Field, (field) => field.responses)
  field: Field;
}
