import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Form } from 'src/form/form.entity';
import { Signup } from 'src/signup/signup.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column('date')
  date: Date;

  @Column()
  image: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @OneToOne(() => Form, (form) => form.event, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  form: Form;

  @OneToMany(() => Signup, (signup) => signup.event)
  signups: Signup[];
}
