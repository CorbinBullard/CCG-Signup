import { EventConsentForm } from 'src/event_consent_forms/entities/event_consent_form.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConsentForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  body: string;

  @OneToMany(() => EventConsentForm, (ecf) => ecf.consentForm)
  eventConsentForms: EventConsentForm[];
}
