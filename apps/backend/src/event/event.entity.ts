import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Form } from 'src/form/form.entity';
import { Signup } from 'src/signup/signup.entity';
import { FundLocationEnum } from './FundLocationEnum';
import { EventConsentForm } from 'src/event-consent-forms/entities/event-consent-form.entity';

@Entity()
@Index(['title', 'date'], { unique: true })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('date')
  date: Date;

  @Column('time')
  time: string;

  @Column()
  image: string;

  @Column({
    type: 'text',
    enum: FundLocationEnum,
    default: FundLocationEnum.General,
  })
  funds?: FundLocationEnum;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column({ nullable: true, type: 'integer' })
  signupLimit: number;

  // Relationships

  @OneToOne(() => Form, (form) => form.event, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  form: Form;

  @OneToMany(() => Signup, (signup) => signup.event)
  signups: Signup[];

  @OneToMany(() => EventConsentForm, (ecf) => ecf.event)
  eventConsentForms: EventConsentForm[];
}
