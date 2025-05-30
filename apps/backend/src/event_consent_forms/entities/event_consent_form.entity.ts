import { ConsentForm } from 'src/consent_forms/entities/consent_form.entity';
import { Event } from 'src/event/event.entity';
import {
  Column,
  Entity,
  ManyToOne,
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
}
