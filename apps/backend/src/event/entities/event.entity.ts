import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Form } from 'src/form/form.entity';
import { Signup } from 'src/signup/signup.entity';
import { FundLocationEnum } from '../FundLocationEnum';
import { EventConsentForm } from 'src/event-consent-forms/entities/event-consent-form.entity';
import { EnumColumnType } from 'src/typeorm.config/ColumnConfig';

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

  @Column({ default: false })
  isActive: boolean;

  //Fix this when using POSTGRES
  @Column({
    ...EnumColumnType({
      nullable: true,
      enumType: FundLocationEnum,
    }),
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
