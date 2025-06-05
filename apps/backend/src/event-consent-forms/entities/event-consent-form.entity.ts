import { ConsentForm } from 'src/consent-forms/entities/consent-form.entity';
import { Event } from 'src/event/entities/event.entity';
import { SignupConsentForm } from 'src/signup-consent-forms/entities/signup-consent-form.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['eventId', 'consentFormId'])
export class EventConsentForm {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.eventConsentForms, {
    onDelete: 'CASCADE',
  })
  event: Event;

  @ManyToOne(
    () => ConsentForm,
    (consentForm) => consentForm.eventConsentForms,
    { onDelete: 'CASCADE' },
  )
  consentForm: ConsentForm;

  @Column()
  eventId: number;

  @Column()
  consentFormId: number;

  @Column({ default: false })
  required: boolean;

  @OneToMany(() => SignupConsentForm, (scf) => scf.eventConsentForm)
  signupConsentForms: SignupConsentForm[];
}
