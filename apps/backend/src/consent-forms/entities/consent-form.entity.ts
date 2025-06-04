import { EventConsentForm } from 'src/event-consent-forms/entities/event-consent-form.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConsentForm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  body: string;

  @OneToMany(() => EventConsentForm, (ecf) => ecf.consentForm)
  eventConsentForms: EventConsentForm[];
}
