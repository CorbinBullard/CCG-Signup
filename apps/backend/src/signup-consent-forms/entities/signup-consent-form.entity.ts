import { EventConsentForm } from 'src/event-consent-forms/entities/event-consent-form.entity';
import { Signup } from 'src/signup/signup.entity';
import { DateTimeColumnType } from 'src/typeorm.config/ColumnConfig';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Index(['signupId', 'eventConsentFormId'], { unique: true })
export class SignupConsentForm {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Signup, (signup) => signup.signupConsentForms, {
    onDelete: 'CASCADE',
  })
  signup: Signup;

  @Column()
  signupId: number;

  @ManyToOne(() => EventConsentForm, (ecf) => ecf.signupConsentForms, {
    onDelete: 'CASCADE',
  })
  eventConsentForm: EventConsentForm;

  @Column()
  eventConsentFormId: number;

  @Column({ type: 'boolean', default: false })
  agreed: boolean;

  @Column({ ...DateTimeColumnType({ nullable: true }) })
  agreedAt?: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column()
  deviceName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
